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

Meteor.publish('contracts.limit', function (limit) {
    return Contracts.find({ status: 'done' }, { limit: limit })
})

Meteor.publish('contracts.report', function (month, status, patios) {
    // return Contracts.find({ month: month })
    if (patios[0] == 'allPatios' && status == 'all') return Contracts.find({ month: month })
    if (patios[0] != 'allPatios' && status == 'all') return Contracts.find({ month: month, patio: { $in: patios } })
    if (patios[0] == 'allPatios' && status != 'all') return Contracts.find({ month: month, status: status })
    if (patios[0] != 'allPatios' && status != 'all') return Contracts.find({ month: month, status: status, patio: { $in: patios } })
})