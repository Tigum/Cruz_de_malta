import { Meteor } from 'meteor/meteor';
import { Reports } from './reports.js';

Meteor.methods({
  'reports.insert'(doc) {
    return Reports.insert(doc);
  },
  'reports.delete'(reportId) {
    return Reports.remove({_id: reportId});
  },
});