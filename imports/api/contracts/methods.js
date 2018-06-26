import { Meteor } from 'meteor/meteor';
import { Contracts } from './contracts.js';

Meteor.methods({
    'contracts.insert'(doc) {
        return Contracts.insert(doc);
    },
    'contracts.edit'(doc) {
        return Contracts.update({ _id: doc.id },
            {
                $set: {
                    plate: doc.plate,
                    renavam: doc.renavam,
                    chassis: doc.chassis,
                    patio: doc.patio,
                    value: doc.value,
                }
            });
    },
    'contracts.delete'(contractId) {
        return Contracts.remove({ _id: contractId });
    },
    'contracts.addvalue'(contractId, doc) {
        return Contracts.update({ _id: contractId }, {$push: {debitsAndCredits: doc}});
    },
    'contracts.removevalue'(contractId, valueId) {
        return Contracts.update({ _id: contractId }, {$pull: {debitsAndCredits: {id: valueId}}});
    },
    'contracts.addbalance'(contractId, balance, profitable) {
        return Contracts.update({ _id: contractId }, {$set:{balance: balance, profitable: profitable}});
    },
});