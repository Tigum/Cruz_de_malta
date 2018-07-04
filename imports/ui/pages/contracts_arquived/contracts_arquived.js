import './contracts_arquived.html';
import '../modals/add_contract.js';
import '../modals/add_value.js';
import '../modals/add_reason.js';
import '../modals/see_details.js';
import '../../components/pre-loader/pre-loader.js';
import '../../components/navbar/navbar.js';
import { Contracts } from '../../../api/contracts/contracts';
import { Regions } from '../../../api/regions/regions';


Template.contracts_arquived.onCreated(function () {
    Session.set('search', '')
    Session.set('contractsLimit', 20)
    this.autorun(() => {
        this.subscribe('contracts.limit', Session.get('contractsLimit'))
    })    
})

Template.contracts_arquived.helpers({
    contracts() {
        let filter = Session.get('search') ? Session.get('search') : ''
        let selector = { status: 'done' };
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
    hideButton() {
        const contracts = Contracts.find({ status: 'done'}) ? Contracts.find({ status: 'done'}).fetch() : []
        return contracts.length == Session.get('contractsLimit') ? true : false
    }
});

Template.contract_item_arquived.helpers({
    regionName(regionId) {
        return Regions.findOne({_id: regionId}) ? Regions.findOne({_id: regionId}).name : []
    },
    regionPrice(regionId) {
        return Regions.findOne({_id: regionId}) ? Regions.findOne({_id: regionId}).price : []
    },
    balance(contractId) {
        
        const contract = Contracts.findOne({_id: contractId}) ? Contracts.findOne({_id: contractId}) : ''

        if(!contract) return

        if(contract.balance > 0){
            return  contract.balance ? 'R$'+contract.balance.toFixed(2) : 'R$0.00'
        }else{
            return  contract.balance ? '-R$'+contract.balance.toFixed(2)*(-1) : 'R$0.00'
        }
    },
    isProfitable(contractId) {
        
        const contract = Contracts.findOne({_id: contractId}) ? Contracts.findOne({_id: contractId}) : ''

        if(!contract) return
        
        if(contract.balance > 0 || contract.balance == 0){
            return  true
        }else{
            return  false
        }
    }
});

Template.contract_item_arquived.events({
    'click .editContract'(event, template) {
        event.preventDefault();
        Session.set('editContractMode', true)
        const clickedItem = $(event.currentTarget);
        const contractId = clickedItem.attr('data-contract-id')
        Session.set('contractId', contractId)
        const doc = Contracts.findOne({_id: contractId})
        $('.contract_plate').val(doc.plate)
        $('.contract_renavam').val(doc.renavam)
        $('.contract_chassis').val(doc.chassis)
        $('.contract_patio').val(doc.patio)
        $('.contract_value').val(doc.value)
        $('.contract_region').val(doc.region.name)
        $('#add_contract_modal').modal('show');
    },
    // 'click .addValueToContract'(event, template) {
    //     event.preventDefault();
    //     $( ".debitSelected" ).prop( "checked", false );
    //     $( ".creditSelected" ).prop( "checked", false );
    //     Session.set('typeOfValueSelected', '')
    //     const clickedItem = $(event.currentTarget);
    //     const contractId = clickedItem.attr('data-contract-id')
    //     Session.set('contractId', contractId)
    //     const doc = Contracts.findOne({_id: contractId})
    //     $('#add_value_modal').modal('show');
    // },
    'click .seeContractDetails'(event, template) {
        event.preventDefault();
        const clickedItem = $(event.currentTarget);
        const contractId = clickedItem.attr('data-contract-id')
        Session.set('contractId', contractId)
        $('#see_details_modal').modal('show');
    },
    'click .reOpenContract'(event, template) {
        event.preventDefault();
        const result = window.confirm('Tem certeza que deseja arquivar esse contrato?');
        if (!result) return;
        const clickedItem = $(event.currentTarget);
        const contractId = clickedItem.attr('data-contract-id')
        Session.set('contractId', contractId)
        Meteor.call('contracts.reopen', contractId)
    },
})


Template.contracts_arquived.events({
    'click .seeMore'(event, template) {
        event.preventDefault();
        Session.set('contractsLimit', Session.get('contractsLimit') + 20) 
    },
})