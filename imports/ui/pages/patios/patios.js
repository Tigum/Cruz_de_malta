import './patios.html';
import '../../pages/modals/add_patio.js'
import '../../components/pre-loader/pre-loader.js';
import { Session } from "meteor/session";
import { Patios } from '../../../api/patios/patios.js';

Template.patios.onCreated(function () {
    this.subscribe("patios")
})

Template.patios.helpers({
    patios: () => Patios.find() ? Patios.find({}, {sort: {name: 1}}).fetch() : [],
});

Template.patios.events({
    'click .editPatio'(event, template) {
        event.preventDefault();
        Session.set('patioEdit', true)
        const clickedItem = $(event.currentTarget);
        const patioId = clickedItem.attr('data-patio-id')
        Session.set('patioId', patioId)
        const doc = Patios.findOne({_id: patioId})
        $('.patio-input').val(doc.name)
        $('#add_patio_modal').modal('show'); 
    },
    'click .deletePatio'(event, template) {
        event.preventDefault();
        const clickedItem = $(event.currentTarget);
        const patioId = clickedItem.attr('data-patio-id')
        const result = window.confirm('Tem certeza que deseja deletar esse patio?');
        if (!result) return;
        Meteor.call('patios.delete', patioId)
    },
})