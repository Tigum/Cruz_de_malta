import './home.html';
import '../modals/add_contract.js';
import '../modals/add_value.js';
import '../modals/add_reason.js';
import { Contracts } from '../../../api/contracts/contracts';
import { Regions } from '../../../api/regions/regions';


Template.contracts.onCreated(function () {
    this.autorun(() => {
        this.subscribe('contracts')
    })    
})

Template.contracts.helpers({
    contracts: () => Contracts.find() ? Contracts.find().fetch() : [],
});

Template.contract_item.helpers({
    regionName(regionId) {
        return Regions.findOne({_id: regionId}) ? Regions.findOne({_id: regionId}).name : []
    },
    regionPrice(regionId) {
        return Regions.findOne({_id: regionId}) ? Regions.findOne({_id: regionId}).price : []
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
})