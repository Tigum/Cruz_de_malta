import { Meteor } from 'meteor/meteor'
import { Contracts } from '../contracts.js';

Meteor.publish('contracts', function () {
    return Contracts.find()
})

Meteor.publish('contract', function (contractId) {
    return Contracts.find({_id: contractId})
})