import './add_pendency.html';
import './pendencies.js';
import { Pendencies } from '../../../api/pendencies/pendencies';

Template.add_pendency.onCreated(function () {
    this.autorun(() => {
        this.subscribe('pendencies')
    })
})


Template.add_pendency.events({
    'click .addPendency'(event, template) {
        event.preventDefault();

        if(Pendencies.findOne({description: $('.pendency-input').val()})) return alert('Opção de pendência já adicionada ao banco de dados. Favor adicionar outra.')

            const doc = {
                description: $('.pendency-input').val().toUpperCase(),
                createdAt: new Date(),
                status: 'not_selected'
            }
            Meteor.call('pendencies.insert', doc)
            alert('Opção de pendência adicionada com sucesso')
    
        $('.pendency-input').val('')
        $('#add_pendency_modal').modal('toggle');
        $('#pendencies_modal').modal('show');

    },
})


