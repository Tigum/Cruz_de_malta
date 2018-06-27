// import { Meteor } from 'meteor/meteor';
import './navbar.html';
import '../../pages/modals/add_region.js'
import '../../pages/modals/add_contract.js'
import '../../pages/modals/add_patio.js'
import { Session } from "meteor/session";

Template.navbar.onCreated(function () {
    $('.search').val('')
    Session.set('search', '');
})

Template.navbar.events({
    'click .add_patio'(event, template) {
        event.preventDefault();
        Session.set('patioEdit', false)
        $('.patio-input').val('')
        $('#add_patio_modal').modal('show');
    },
    'click .add_region'(event, template) {
        event.preventDefault();
        $('.region-input').val('')
        $('.region_price').val('')
        Session.set('editRegionMode', false)
        $('#add_region_modal').modal('show');
    },
    'click .add_contract'(event, template) {
        event.preventDefault();
        $('.contract_plate').val('')
        $('.contract_renavam').val('')
        $('.contract_chassis').val('')
        Session.set('editContractMode', false)
        $('#add_contract_modal').modal('show');
    },
    'keyup .search': (event, template) => {
        Session.set('search', $('.search').val());
    },
})
