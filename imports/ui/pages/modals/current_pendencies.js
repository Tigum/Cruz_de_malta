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
    currentPendencies(contractId) {
        return Contracts.findOne({ _id: contractId }) ? Contracts.findOne({ _id: contractId }).pendencies : []
    }
});

Template.current_pendencies.events({
    'click .addPendencyToContract'(event, template) {
        event.preventDefault();
        const pendenciesIds = Session.get('selectedPendencies')
        const contractPendencies = Contracts.findOne({ _id: Session.get('contractId') }) ? Contracts.findOne({ _id: Session.get('contractId') }).pendencies : []
        if (!pendenciesIds) return 'Selecione pendências a serem adicionadas'

        pendenciesIds.map(function (element) {
            const pendency = Pendencies.findOne({ _id: element })

            contractPendencies.map(function (elemento) {
                if (elemento._id != element) {
                    Meteor.call('contracts.addpendency', Session.get('contractId'), pendency)
                }
            })
        })

        alert('Pendências adicionadas ao contrato')
        $('#current_pendencies_modal').modal('toggle');

    },
    'click .custom-control-input'(event, template) {
        let pendencies = []
        if (Session.get('selectedPendencies').length == 0) {
            pendencies = []
        } else {
            pendencies = Session.get('selectedPendencies')
        }
        const clickedItem = $(event.currentTarget);
        const pendencyId = clickedItem.attr('data-pendency')

        if (pendencyId) {
            if (jQuery.inArray(pendencyId, pendencies) !== -1) {
                pendencies = jQuery.grep(pendencies, function (value) {
                    return value != pendencyId;
                });
            } else {
                pendencies.push(pendencyId)
            }
            Session.set('selectedPendencies', pendencies)
        }
    },
})