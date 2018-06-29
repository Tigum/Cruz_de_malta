import { Session } from "meteor/session";
import './add_value.html';
import './add_reason.js';
import '../home/home.js';
import { Reasons } from "../../../api/reasons/reasons.js";
import slugify from "slugify"
import { Contracts } from "../../../api/contracts/contracts";

Template.add_value.onCreated(function () {
    Session.set('typeOfValueSelected', '')
    this.autorun(() => {
        this.subscribe('reasons')
    })
})

Template.add_value.onDestroyed(function () {
    Session.set('typeOfValueSelected', '')
})

Template.add_value.helpers({
    debitIsSelected: () => Session.get('typeOfValueSelected') == 'Débito' ? true : false,
    creditIsSelected: () => Session.get('typeOfValueSelected') == 'Crédito' ? true : false,
    reasonsDebit: () => Reasons.find({type: 'Débito'}) ? Reasons.find({type: 'Débito'}).fetch() : [],
    reasonsCredit: () => Reasons.find({type: 'Crédito'}) ? Reasons.find({type: 'Crédito'}).fetch() : [],
});


Template.add_value.events({
    'change .debitSelected'(event, template) {
        Session.set('typeOfValueSelected', 'Débito')
    },
    'change .creditSelected'(event, template) {
        Session.set('typeOfValueSelected', 'Crédito')
    },
    'click .addNewReasonDebit'(event, template) {
        event.preventDefault();
        $('#add_value_modal').modal('toggle');
        $('#add_reason_modal').modal('show');
        const clickedItem = $(event.currentTarget);
        const reason = clickedItem.attr('data-reason')
        Session.set('data-reason', reason)
    },
    'click .addNewReasonCredit'(event, template) {
        event.preventDefault();
        $('#add_value_modal').modal('toggle');
        $('#add_reason_modal').modal('show');
        const clickedItem = $(event.currentTarget);
        const reason = clickedItem.attr('data-reason')
        Session.set('data-reason', reason)
    },
    'click .buttonModalSave'(event, template) {
        event.preventDefault();
        if($('.chosen_reason').val() == 'not_selected') return alert('Favor selecionar uma razão')
        const clickedItem = $(event.currentTarget);
        const reasonInfo = clickedItem.attr('data-reason-info')
        const contractId = Contracts.findOne({_id: Session.get('contractId')}) ? Contracts.findOne({_id: Session.get('contractId')})._id : ''

        if(reasonInfo == 'debit'){
            const doc = {
                id: $('.chosen_reason_debit').val(),
                value: -parseFloat($('.reason_value_debit').val()).toFixed(2),
                reason: Reasons.findOne({_id: $('.chosen_reason_debit').val()}) ? Reasons.findOne({_id: $('.chosen_reason_debit').val()}).name : 'name not found',
                type: 'Débito',
                secondId: Random.id([17])
            }
            Meteor.call('contracts.addvalue', contractId, doc)
            alert('Débito adicionado ao contrato')
        }

        if(reasonInfo == 'credit'){
            const doc = {
                id: $('.chosen_reason_credit').val(),
                value: parseFloat($('.reason_value_credit').val()).toFixed(2),
                reason: Reasons.findOne({_id: $('.chosen_reason_credit').val()}) ? Reasons.findOne({_id: $('.chosen_reason_credit').val()}).name : 'name not found',
                type: 'Crédito',
                secondId: Random.id([17])
            }
            Meteor.call('contracts.addvalue', contractId, doc)
            alert('Crédito adicionado ao contrato')
        }
        $('.reason_value_credit').val()
        $('.chosen_reason_credit').val('not_selected')
        $('#add_value_modal').modal('toggle');
    },
})