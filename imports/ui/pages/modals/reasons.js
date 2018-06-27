import './reasons.html';
import '../../components/pre-loader/pre-loader.js';
import '../../components/navbar/navbar.js';
import { Reasons } from '../../../api/reasons/reasons';

Template.reasons.onCreated(function () {
    this.autorun(() => {
        this.subscribe('reasons')
    })
})

Template.reasons.helpers({
    reasons() {
        if(Session.get('reasonsEditIsDebit') == true){
            return Reasons.find() ? Reasons.find({type: 'Débito'}).fetch() : []
        }else{
            return Reasons.find() ? Reasons.find({type: 'Crédito'}).fetch() : []
        }
        
    },
    isDebit: () => Session.get('reasonsEditIsDebit')
});

Template.reasons.events({
    'click .removeReason'(event, template) {
        event.preventDefault();
        const result = window.confirm('Tem certeza que deseja deletar essa razão?');
        if (!result) return;
        const clickedItem = $(event.currentTarget);
        Meteor.call('reasons.delete', clickedItem.attr('data-reason-id'))
    },
})