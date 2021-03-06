import { Meteor } from 'meteor/meteor';
import { Regions } from './regions.js';

Meteor.methods({
  'regions.insert'(doc) {
    return Regions.insert(doc);
  },
  'regions.edit'(doc) {
    return Regions.update({ _id: doc.id }, { $set: { name: doc.name, price: doc.price } });
  },
  'regions.delete'(regionId) {
    if (!Meteor.userId()) {
      return
    } else {
      Regions.remove({ _id: regionId });
      return true
    }

  },
});