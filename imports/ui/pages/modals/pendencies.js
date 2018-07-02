import './add_pendency.html';
import './pendencies.html';
import '../../components/pre-loader/pre-loader.js';
import '../../components/navbar/navbar.js';
import { Pendencies } from '../../../api/pendencies/pendencies';

Template.pendencies.onCreated(function () {
    this.autorun(() => {
        this.subscribe('pendencies')
    })
})

Template.pendencies.helpers({
    pendencies: () => Pendencies.find() ? Pendencies.find().fetch() : []
    
});

Template.pendencies.events({
    'click .removePendency'(event, template) {
        event.preventDefault();
        const result = window.confirm('Tem certeza que deseja deletar essa opção de pendência?');
        if (!result) return;
        const clickedItem = $(event.currentTarget);
        Meteor.call('pendencies.delete', clickedItem.attr('data-pendency-id'))
    },
    'click .addNewOptionPendency'(event, template) {
        // event.preventDefault();
        $('#pendencies_modal').modal('toggle');
        $('#add_pendency_modal').modal('show');
    },
})