// import { Meteor } from 'meteor/meteor';
import './navbar.html';
import '../../pages/modals/add_region.js'
import '../../pages/modals/add_contract.js'
import '../../pages/modals/add_patio.js'
import '../../pages/modals/add_report.js'
import '../../pages/modals/reasons.js'
import '../../pages/modals/new_user.js'
import '../../pages/modals/pendencies.js'
import '../../pages/modals/add_pendency.js'
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
        FlowRouter.go('/patios')
        Session.set('patioEdit', false)
        $('.patio-input').val('')
        $('#add_patio_modal').modal('show');
    },
    'click .add_region'(event, template) {
        event.preventDefault();
        FlowRouter.go('/regions')
        $('.region-input').val('')
        $('.region_price').val('')
        Session.set('editRegionMode', false)
        $('#add_region_modal').modal('show');
    },
    'click .add_contract'(event, template) {
        event.preventDefault();
        FlowRouter.go('/')
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
        FlowRouter.go('/reports')
        Session.set('generatingReport', false)
        Session.set('contractsSelected', null)
        Session.set('patiosNames', null)
        Session.set('date.length', 0)
        $('.month_selected').val('not_selected')
        $('.year_selected').val('not_selected')
        $('.contracts_selected').val('not_selected')
        Session.set('checked', true)
        Session.set('allPatiosSelected', false)
        Session.set('selectedPatios', [])
        $(".custom-control-input").prop('checked', false)
        $('#add_report_modal').modal('show');
    },
    'click .logoff'(event, template) {
        const result = window.confirm('Você tem certeza que desejar deslogar?');
        if (!result) return;
        Meteor.logout();
        FlowRouter.go('/login')
        location.reload()
    },
    'click .create_user'(event, template) {
        event.preventDefault();
        $('#new_user_modal').modal('show');
    },
    'click .edit_pendencies'(event, template) {
        event.preventDefault();
        $('#pendencies_modal').modal('show');
    },
})
