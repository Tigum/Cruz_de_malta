import './home.html';
import '../modals/add_contract.js';
import '../modals/add_value.js';
import '../modals/add_reason.js';
import '../modals/see_details.js';
import '../modals/current_pendencies.js';
import '../../components/pre-loader/pre-loader.js';
import '../../components/navbar/navbar.js';
import { Contracts } from '../../../api/contracts/contracts';
import { Regions } from '../../../api/regions/regions';
import moment from "moment";

Template.contracts.onCreated(function () {
    Session.set('search', '')
    this.autorun(() => {
        if(FlowRouter.getRouteName() == 'contracts'){
        this.subscribe('contracts')
        }
    })    
})

Template.contracts.helpers({
    contracts() {
        let filter = Session.get('search') ? Session.get('search') : ''
        let selector = { status: 'new' };
        let options = { sort: { createdAt: -1 } }

        if (filter.length > 1) {
            let regexOptions = {
                $regex: filter,
                $options: 'i',
            };
            selector['$or'] = [{
                region: regexOptions,
            }, {
                plate: regexOptions,
            }, {
                renavam: regexOptions,
            }, {
                chassis: regexOptions,
            }, {
                date: regexOptions,
            }, {
                patio: regexOptions,
            }];
            return Contracts.find(selector, options) ? Contracts.find(selector, options).fetch() : []
        } else {
            return Contracts.find(selector, options) ? Contracts.find(selector, options).fetch() : []
        }
    },
    activeContracts: () => Contracts.find({status: 'new'}) ? 'Total: '+Contracts.find({status: 'new'}).fetch().length : '0',
    pendingContracts() {
        const allContracts = Contracts.find({status: 'new'}) ? Contracts.find({status: 'new'}).fetch() : []
        let pendingContracts = []

        allContracts.map(function(element){
            let pendingDate = moment(element.createdAt).add(19, 'days')
            let expiredDate = moment(element.createdAt).add(30, 'days')
            if (moment().isAfter(pendingDate) && moment().isBefore(expiredDate)) {
                pendingContracts.push(element._id)
            }
        })

        return pendingContracts ? 'Pendentes ou com mais de 20 dias: '+pendingContracts.length : 'Mais de 20 dias: 0'
    },
    expiredContracts() {
        const allContracts = Contracts.find({status: 'new'}) ? Contracts.find({status: 'new'}).fetch() : []
        let expiredContracts = []

        allContracts.map(function(element){
            let expiredDate = moment(element.createdAt).add(30, 'days')
            if (moment().isAfter(expiredDate) || moment().isSame(expiredDate)) {
                expiredContracts.push(element._id)
            }
        })

        return expiredContracts ? 'Mais de 30 dias: '+expiredContracts.length : 'Mais de 30 dias: 0'
    },
});

Template.contract_item.helpers({
    contractPending(contractId){
        if(!contractId) return
        const contractDate = Contracts.findOne({_id: contractId}).createdAt
        const pendingDate = moment(contractDate).add(19, 'days')
        const expiredDate = moment(contractDate).add(30, 'days')

        if (moment().isAfter(pendingDate) && moment().isBefore(expiredDate)) return 'alert alert-warning'
        if (Contracts.findOne({_id: contractId}).pendencies && Contracts.findOne({_id: contractId}).pendencies.length > 0 && moment().isBefore(expiredDate)) return 'alert alert-warning'
        if (moment().isAfter(expiredDate) || moment().isSame(expiredDate)) return 'alert alert-danger'

    },
    regionName(regionId) {
        return Regions.findOne({_id: regionId}) ? Regions.findOne({_id: regionId}).name : []
    },
    regionPrice(regionId) {
        return Regions.findOne({_id: regionId}) ? Regions.findOne({_id: regionId}).price : []
    },
    balance(contractId) {
        
        const contract = Contracts.findOne({_id: contractId})
        const values = contract.debitsAndCredits
        let valuesArray = [contract.region.price]
        if(!values || values.length == 0) {
            Meteor.call('contracts.addbalance', contractId, contract.region.price, true)
            return contract.region ? 'R$'+contract.region.price.toFixed(2) : 'Não há honorários'
        }
        values.map(function(element){
            if(element.value){
                valuesArray.push(element.value)
            }
        })

        const sum = valuesArray.reduce(add, 0);
        function add(a, b) {return a + b}

        if(sum == contract.balance && contract.balance){
            if(sum > 0){
                return  contract.balance ? 'R$'+contract.balance.toFixed(2) : 'Sum not working'
            }else{
                return  contract.balance ? '-R$'+contract.balance.toFixed(2)*(-1) : 'Sum not working'
            }
        }else{
            if(sum > 0){
                Meteor.call('contracts.addbalance', contractId, sum, true)
                return  contract.balance ? 'R$'+contract.balance.toFixed(2) : 'Sum not working'
            }else{
                Meteor.call('contracts.addbalance', contractId, sum, false)
                return  contract.balance ? '-R$'+contract.balance.toFixed(2)*(-1) : 'Sum not working'
            }
        }
    }
});

Template.contract_item.events({
    'click .editContract'(event, template) {
        event.preventDefault();
        Session.set('editContractMode', true)
        const clickedItem = $(event.currentTarget);
        const contractId = clickedItem.attr('data-contract-id')
        Session.set('contractId', contractId)
        const doc = Contracts.findOne({_id: contractId})
        console.log('doc', doc)
        $('.contract_plate').val(doc.plate)
        $('.contract_renavam').val(doc.renavam)
        $('.contract_chassis').val(doc.chassis)
        $('.contract_patio').val(doc.patio)
        $('.contract_value').val(doc.value)
        $('.contract_region').val(doc.region.name)
        $('#add_contract_modal').modal('show');
    },
    'click .addValueToContract'(event, template) {
        event.preventDefault();
        $( ".debitSelected" ).prop( "checked", false );
        $( ".creditSelected" ).prop( "checked", false );
        Session.set('typeOfValueSelected', '')
        const clickedItem = $(event.currentTarget);
        const contractId = clickedItem.attr('data-contract-id')
        Session.set('contractId', contractId)
        const doc = Contracts.findOne({_id: contractId})
        $('#add_value_modal').modal('show');
    },
    'click .seeContractDetails'(event, template) {
        event.preventDefault();
        const clickedItem = $(event.currentTarget);
        const contractId = clickedItem.attr('data-contract-id')
        Session.set('contractId', contractId)
        $('#see_details_modal').modal('show');
    },
    'click .pendencies'(event, template) {
        event.preventDefault();
        Session.set('selectedPendencies', [])
        const clickedItem = $(event.currentTarget);
        const contractId = clickedItem.attr('data-contract-id')
        Session.set('contractId', contractId)
        $('#current_pendencies_modal').modal('show');
    },
})
