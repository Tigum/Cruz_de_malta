import './current_pendencies.html';
import '../home/home.js';
import '../../components/pre-loader/pre-loader.js';
import { Pendencies } from '../../../api/pendencies/pendencies';
import { Contracts } from '../../../api/contracts/contracts';

Template.current_pendencies.onCreated(function () {
    Session.set('selectedPendencies', [])
    this.autorun(() => {
        this.subscribe('pendencies')
        this.subscribe('contract.specific', Session.get('contractId'))
    })
})

Template.current_pendencies.helpers({
    pendencies: () => Pendencies.find() ? Pendencies.find().fetch() : [],
    currentPendencies: () => Contracts.findOne({ _id: Session.get('contractId') }) ? Contracts.findOne({ _id: Session.get('contractId') }).pendencies : []
});

Template.current_pendencies.events({
    'click .addPendencyToContract'(event, template) {
        event.preventDefault();
        if (!$('.contract_pendency_selected').val() || $('.contract_pendency_selected').val() == 'not_selected') return alert('Selecione pendências a serem adicionadas')
        Session.set('addpendency', true)
        const contractPendencies = Contracts.findOne({ _id: Session.get('contractId') }) && Contracts.findOne({ _id: Session.get('contractId') }).pendencies ? Contracts.findOne({ _id: Session.get('contractId') }).pendencies : []

        if (contractPendencies.length == 0) {
            Meteor.call('contracts.addpendency', Session.get('contractId'), Pendencies.findOne({ _id: $('.contract_pendency_selected').val() }))
            return alert('Pendência adicionada ao contrato')
        } else {
            contractPendencies.map(function (element) {
                if (element._id == $('.contract_pendency_selected').val()) {
                    Session.set('addpendency', false)
                }
            })

            if (Session.get('addpendency') == true) {
                Meteor.call('contracts.addpendency', Session.get('contractId'), Pendencies.findOne({ _id: $('.contract_pendency_selected').val() }))
                return alert('Pendência adicionada ao contrato')
            } else {
                Session.set('addpendency', true)
                return alert('Pendência já adicionada ao contrato. Selecione outra.')
            }

        }

    },
    'click .removePendency'(event, template) {
        event.preventDefault();
        const result = window.confirm('Você tem certeza que desejar remover esta pendência?');
        if (!result) return;
        const clickedItem = $(event.currentTarget);
        Meteor.call('contracts.removependency', Session.get('contractId'), clickedItem.attr('data-pendency-id'))
    },
})