import './add_reason.html';
import './add_value.html';
import { Reasons } from '../../../api/reasons/reasons';

Template.add_reason.onCreated(function () {
    this.autorun(() => {
        this.subscribe('reasons')
    })
})

Template.add_reason.helpers({
    isDebit: () => Session.get('data-reason') ? Session.get('data-reason') : true,
})

Template.add_reason.events({
    'click .buttonModalSave'(event, template) {
        event.preventDefault();

        if(Reasons.findOne({name: $('.reason-input').val()})) return alert('Razão já adicionada ao banco de dados. Favor adicionar outra.')

        if(Session.get('data-reason') == 'debit'){
            const doc = {
                name: $('.reason-input').val(),
                createdAt: new Date(),
                type: 'Débito'
            }
            Meteor.call('reasons.insert', doc)
            alert('Razão de débito adicionada com sucesso')
        }

        if(Session.get('data-reason') == 'credit'){
            const doc = {
                name: $('.reason-input').val(),
                createdAt: new Date(),
                type: 'Crédito'
            }
            Meteor.call('reasons.insert', doc)
            alert('Razão de crédito adicionada com sucesso')
        }
        $('.reason-input').val('')
        $('#add_reason_modal').modal('toggle');
        $('#add_value_modal').modal('show');

    },
})