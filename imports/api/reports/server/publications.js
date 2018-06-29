import { Meteor } from 'meteor/meteor'
import { Reports } from '../reports.js';

Meteor.publish('reports', function () {
    return Reports.find()
})

Meteor.publish('report', function (reportId) {
    return Reports.find({_id: reportId})
})