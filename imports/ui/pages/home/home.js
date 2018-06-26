import './home.html';
import '../modals/add_contract.js';
import '../modals/add_value.js';
import '../modals/add_reason.js';
import '../modals/see_details.js';
import { Contracts } from '../../../api/contracts/contracts';
import { Regions } from '../../../api/regions/regions';


Template.contracts.onCreated(function () {
    this.autorun(() => {
        this.subscribe('contracts')
    })    
})

Template.contracts.helpers({
    contracts: () => Contracts.find() ? Contracts.find({}, {sort:{createdAt:-1}}).fetch() : [],
});

Template.contract_item.helpers({
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
        if(!values) {
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
        $('.contract_plate').val(doc.plate)
        $('.contract_renavam').val(doc.renavam)
        $('.contract_chassis').val(doc.chassis)
        $('.contract_patio').val(doc.patio)
        $('.contract_value').val(doc.value)
        $('.contract_region').val(doc.region)
        $('#add_contract_modal').modal('show');
    },
    'click .deleteContract'(event, template) {
        event.preventDefault();
        Session.set('editContractMode', true)
        const clickedItem = $(event.currentTarget);
        const contractId = clickedItem.attr('data-contract-id')
        const result = window.confirm('Tem certeza que deseja deletar esse contrato permanentemente?');
        if (!result) return;
        Meteor.call('contracts.delete', contractId)
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
})
