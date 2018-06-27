import { Meteor } from 'meteor/meteor';
import { Reasons } from './reasons.js';

Meteor.methods({
  'reasons.insert'(doc) {
    return Reasons.insert(doc);
  },
  'reasons.edit'(doc) {
    return Reasons.update({_id: doc.id}, {$set: {name: doc.name}});
  },
  'reasons.delete'(reasonId) {
    return Reasons.remove({_id: reasonId});
  },
});