import { Session } from "meteor/session";
import './add_report.html';
import '../../components/navbar/navbar.js';
import { Patios } from "../../../api/patios/patios";
import { Contracts } from "../../../api/contracts/contracts";
import moment from "moment";

Template.add_report.onCreated(function () {
    Session.set('generatingReport', false)
    Session.set('date.length', 0)
    this.autorun(() => {
        if(FlowRouter.getRouteName() ==  'reports'){
            this.subscribe('patios')
            let date = Session.get('monthSelected') + '/' + Session.get('yearSelected')
            if(!date) return 
            Session.set('date.length', date.length)
            if(Session.get('date.length') == 7 && Session.get('contractsSelected') != null && Session.get('patiosNames') != null){
                this.subscribe('contracts.report', date, Session.get('contractsSelected'), Session.get('patiosNames'))
            }
            
        }
    })
})

Template.add_report.events({
    'click #allPatios'(event, template) {
        if (Session.get('checked') == true) {
            $(".custom-control-input").prop('checked', true);
            Session.set('checked', false)
            Session.set('allPatiosSelected', true)
            Session.set('selectedPatios', ['allPatios'])
        } else {
            $(".custom-control-input").prop('checked', false);
            Session.set('checked', true)
            Session.set('allPatiosSelected', false)
            Session.set('selectedPatios', [])
        }
    },
    'click .buttonModalSave'(event, template) {
        event.preventDefault();
        if ($('.contracts_selected').val() == 'not_selected') return alert('Favor selecionar o tipo de contrato')
        if ($('.month_selected').val() == 'not_selected') return alert('Favor selecionar o mês')
        if ($('.year_selected').val() == 'not_selected') return alert('Favor selecionar o ano')
        if (Session.get('selectedPatios') == []) return alert('Favor selecionar algum patio')
        Session.set('generatingReport', true)
        let allContracts = []
        let balances = []
        let reportContractStatus
        const contracts = Contracts.find().fetch()
        
        if(!contracts || contracts.length == 0) {
            Session.set('contractsSelected', null)
            Session.set('patiosNames', null)
            Session.set('monthSelected', '')
            Session.set('yearSelected', '')
            Session.set('generatingReport', false)
            $('#add_report_modal').modal('toggle');
            return alert('Nenhum contrato encontrado. Tente novamente.')
        } 
        

        contracts.map(function(element){
            allContracts.push(element._id)
            balances.push(element.balance)
        })

        if(Session.get('contractsSelected') == 'all') reportContractStatus = 'Todos contratos'
        if(Session.get('contractsSelected') == 'new') reportContractStatus = 'Contratos ativos'
        if(Session.get('contractsSelected') == 'done') reportContractStatus = 'Contratos arquivados'
        let patiosNomes = Session.get('patiosNames') == 'allPatios' ? ['Todos patios'] : Session.get('patiosNames')

        const sum = balances.reduce(add, 0);
        function add(a, b) {return a + b}

        const doc = {
            period: Session.get('monthSelected') + '/' + Session.get('yearSelected'),
            patios: patiosNomes,
            contractStatus: reportContractStatus,
            createdAt: new Date(),
            date: moment(new Date()).format('DD/MM/YYYY'),
            contracts: allContracts,
            balance: sum
        }

        Meteor.call('reports.insert', doc, function(error, result){
            if(error){
                console.log('error', error)
                // toastr.success('Erro ao gerar o relatório!');
                Session.set('generatingReport', false)
            }else{
                if(result) {
                    Session.set('generatingReport', false)                    
                }

                if(Session.get('generatingReport') == false){
                    // toastr.success('Relatório gerado com sucesso!');
                    $('#add_report_modal').modal('toggle');
                    Session.set('contractsSelected', null)
                    Session.set('patiosNames', null)
                    Session.set('monthSelected', '')
                    Session.set('yearSelected', '')
                    FlowRouter.go('/reports')
                }
                
            }
        })
        

    },
    'click .custom-control-input'(event, template) {
        let patios = []
        let names = []
        if (Session.get('selectedPatios').length == 0) {
            patios = []
        } else {
            patios = Session.get('selectedPatios')
        }
        const clickedItem = $(event.currentTarget);
        const patioId = clickedItem.attr('data-patio')

        if (patioId) {
            if (jQuery.inArray(patioId, patios) !== -1) {
                patios = jQuery.grep(patios, function (value) {
                    return value != patioId;
                });
            } else {
                patios.push(patioId)
            }
            Session.set('selectedPatios', patios)
        }
        let patioNames = Patios.find({_id: {$in: Session.get('selectedPatios')}}) ? Patios.find({_id: {$in: Session.get('selectedPatios')}}).fetch() : ['allPatios']
        if(patioNames[0] != 'allPatios'){
            patioNames.map(function(element){
                names.push(element.name)
            })
            Session.set('patiosNames', names)
        }
        if(Session.get('selectedPatios')[0] == 'allPatios'){
            Session.set('patiosNames', ['allPatios'])
        }
        
    },
    'click .contracts_selected'(event, template) {
        Session.set('contractsSelected', $('.contracts_selected').val())
    },
    'click .month_selected'(event, template) {
        Session.set('monthSelected', $('.month_selected').val())
    },
    'click .year_selected'(event, template) {
        Session.set('yearSelected', $('.year_selected').val())
    },
})

Template.add_report.helpers({
    patios: () => Patios.find() ? Patios.find().fetch() : [],
    generatingReport:() => Session.get('generatingReport')
});