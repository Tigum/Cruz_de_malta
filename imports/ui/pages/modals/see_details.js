import './see_details.html';
import '../home/home.js';
import '../../components/pre-loader/pre-loader.js';
import { Contracts } from '../../../api/contracts/contracts';

Template.see_details.onCreated(function () {
    this.autorun(() => {
        this.subscribe('contract', Session.get('contractId'))
    })
})

Template.see_details.helpers({
    values: () => Contracts.findOne({ _id: Session.get('contractId') }) ? Contracts.findOne({ _id: Session.get('contractId') }).debitsAndCredits : [],
    contractValue: () => Contracts.findOne({ _id: Session.get('contractId') }) ? Contracts.findOne({ _id: Session.get('contractId') }).region.price : [],
    isDebit(type) { return type == 'Débito' ? true : false },
    negativeFormat(value) { return value * (-1) },
    balance: () => Contracts.findOne({ _id: Session.get('contractId') }) ? Contracts.findOne({ _id: Session.get('contractId') }).balance : [],
    isProfit() {
        if(!Contracts.findOne({ _id: Session.get('contractId') })) return
        return Contracts.findOne({ _id: Session.get('contractId') }).balance > 0 ? true : false
    }
});

Template.see_details.events({
    'click .removeValueFromContract'(event, template) {
        event.preventDefault();
        const result = window.confirm('Tem certeza que deseja deletar esse este valor do contrato?');
        if (!result) return;
        const clickedItem = $(event.currentTarget);
        Meteor.call('contracts.removevalue', Session.get('contractId'), clickedItem.attr('data-value-id'), function (error, result) {
            if (error) {
                console.log(error)
            }
            if (result) {
                let debitsAndCredits = Contracts.findOne({ _id: Session.get('contractId') }) ? Contracts.findOne({ _id: Session.get('contractId') }).debitsAndCredits : []
                let valuesArray = []
                const hononary = Contracts.findOne({ _id: Session.get('contractId') }) && Contracts.findOne({ _id: Session.get('contractId') }).region ? Contracts.findOne({ _id: Session.get('contractId') }).region.price : 0

                valuesArray.push(hononary)

                debitsAndCredits.map(function (element) {
                    valuesArray.push(element.value)
                })
                const sum = valuesArray.reduce(add, 0);
                function add(a, b) { return a + b }

                Meteor.call('contracts.updatebalance', Session.get('contractId'), sum, function(error, result){
                    if(error) return console.log(error)
                })
            }
        })
    },
})