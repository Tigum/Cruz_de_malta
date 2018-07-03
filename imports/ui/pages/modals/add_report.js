import { Session } from "meteor/session";
import './add_report.html';
import '../../components/navbar/navbar.js';
import { Patios } from "../../../api/patios/patios";
import { Contracts } from "../../../api/contracts/contracts";
import moment from "moment";

Template.add_report.onCreated(function () {
    this.autorun(() => {
        this.subscribe('patios')
        if(FlowRouter.getRouteName() ==  'reports'){
            this.subscribe('contracts.all')
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

        let contracts = []
        let patiosNames = []
        let balances = []
        let reportContractStatus
        const month = $('.month_selected').val()
        const year = $('.year_selected').val()
        const patios = Session.get('selectedPatios') ? Session.get('selectedPatios') : []
        const contractStatus = $('.contracts_selected').val() ? $('.contracts_selected').val() : ''

        if (patios[0] == 'allPatios' && contractStatus == 'all') {
            reportContractStatus = 'Todos contratos'
            contracts = Contracts.find({ month: month + '/' + year }).fetch()
        }

        if (patios[0] == 'allPatios' && contractStatus != 'all') {
            patiosNames = ['Todos patios']

            contracts = Contracts.find({ month: month + '/' + year, status: contractStatus }).fetch()
        } else {
            const selectedPatios = Patios.find({ _id: { $in: patios } }).fetch()

            selectedPatios.map(function (element) {
                patiosNames.push(element.name)
            })
        }

        if (contractStatus == 'all' && patios[0] != 'allPatios') {
            reportContractStatus = 'Todos contratos'
            contracts = Contracts.find({ month: month + '/' + year, patio: { $in: patiosNames } }).fetch()
        }

        if (patios[0] != 'allPatios' && contractStatus != 'all') {
            contracts = Contracts.find({ month: month + '/' + year, status: contractStatus, patio: { $in: patiosNames } }).fetch()
        }

        if (contractStatus == 'new') {
            reportContractStatus = 'Contratos ativos'
        }
        if (contractStatus == 'done') {
            reportContractStatus = 'Contratos arquivados'
        }

        contracts.map(function(element){
            balances.push(element.balance)
        })

        const sum = balances.reduce(add, 0);
        function add(a, b) {return a + b}

        const doc = {
            period: month + '/' + year,
            patios: patiosNames[0] == 'Todos patios' ? ['Todos patios'] : patiosNames,
            contractStatus: reportContractStatus,
            createdAt: new Date(),
            date: moment(new Date()).format('DD/MM/YYYY'),
            contracts: contracts,
            balance: sum
        }
        Meteor.call('reports.insert', doc)
        alert('Relatório gerado')
        $('#add_report_modal').modal('toggle');
        FlowRouter.go('/reports')

    },
    'click .custom-control-input'(event, template) {
        let patios = []
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
    },
})

Template.add_report.helpers({
    patios: () => Patios.find() ? Patios.find().fetch() : [],
});