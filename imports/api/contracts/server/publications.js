import { Meteor } from 'meteor/meteor'
import { Contracts } from '../contracts.js';

Meteor.publish('contracts', function () {
    return Contracts.find({ status: 'new' })
})

Meteor.publish('contracts.all', function () {
    return Contracts.find()
})

Meteor.publish('contracts.done', function () {
    return Contracts.find({ status: 'done' })
})

Meteor.publish('contract', function (contractId) {
    return Contracts.find({ _id: contractId })
})

Meteor.publish('contracts.specific', function (contractIds) {
    return Contracts.find({ _id: { $in: contractIds } })
})

Meteor.publish('contract.specific', function (contractId) {
    return Contracts.find({ _id: contractId })
})