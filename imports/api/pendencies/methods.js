import { Meteor } from 'meteor/meteor';
import { Pendencies } from './pendencies.js';

Meteor.methods({
  'pendencies.insert'(doc) {
    return Pendencies.insert(doc);
  },
  'pendencies.edit'(doc) {
    return Pendencies.update({_id: doc.id}, {$set: {description: doc.description}});
  },
  'pendencies.delete'(pendencyId) {
    return Pendencies.remove({_id: pendencyId});
  },
});