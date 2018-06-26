import { Meteor } from 'meteor/meteor';
import { Patios } from './patios.js';

Meteor.methods({
  'patios.insert'(doc) {
    return Patios.insert(doc);
  },
  'patios.edit'(doc) {
    return Patios.update({_id: doc.id}, {$set: {name: doc.name}});
  },
  'patios.delete'(patioId) {
    return Patios.remove({_id: patioId});
  },
});