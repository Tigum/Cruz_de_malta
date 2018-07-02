import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

class PendenciesCollection extends Mongo.Collection {
  insert(doc, callback) {
    doc.createdAt = doc.createdAt || new Date();
    return super.insert(doc, callback);
  }
}

export const Pendencies = new PendenciesCollection('Pendencies');

Pendencies.schema = new SimpleSchema({

  description: {
    type: String,
  },
  createdAt: {
    type: Date
  },
  status: {
    type: String
  },
});

Pendencies.attachSchema(Pendencies.schema);

Pendencies.publicFields = {
    description: 1,
    createdAt: 1,
    status: 1
};

Pendencies.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});
