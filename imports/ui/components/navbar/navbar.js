// import { Meteor } from 'meteor/meteor';
import './navbar.html';
import '../../pages/modals/add_region.js'
import '../../pages/modals/add_contract.js'
import '../../pages/modals/add_patio.js'
import '../../pages/modals/add_report.js'
import '../../pages/modals/reasons.js'
import '../../pages/modals/new_user.js'
import { Session } from "meteor/session";

Template.navbar.onCreated(function () {
    $('.search').val('')
    Session.set('search', '');
    this.autorun(() => {
        this.subscribe('user', Meteor.userId())
    })
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
    'click .edit_reasons_debit'(event, template) {
        event.preventDefault();
        Session.set('reasonsEditIsDebit', true)
        $('#reasons_modal').modal('show');
    },
    'click .edit_reasons_credit'(event, template) {
        event.preventDefault();
        Session.set('reasonsEditIsDebit', false)
        $('#reasons_modal').modal('show');
    },
    'click .generate_report'(event, template) {
        event.preventDefault();
        Session.set('checked', true)
        Session.set('allPatiosSelected', false)
        Session.set('selectedPatios', [])
        $(".custom-control-input").prop('checked', false)
        $('#add_report_modal').modal('show');
    },
    'click .logoff'(event, template) {
        event.preventDefault();
        const result = window.confirm('Você tem certeza que desejar deslogar?');
        if (!result) return;
        Meteor.logout();
        FlowRouter.go('/login')
    },
    'click .create_user'(event, template) {
        event.preventDefault();
        console.log('entrou')
        $('#new_user_modal').modal('show');
    },
})
