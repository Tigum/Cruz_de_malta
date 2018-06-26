import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

class PatiosCollection extends Mongo.Collection {
  insert(doc, callback) {
    doc.createdAt = doc.createdAt || new Date();
    return super.insert(doc, callback);
  }
}

export const Patios = new PatiosCollection('Patios');

Patios.schema = new SimpleSchema({

  name: {
    type: String,
  },
  createdAt: {
    type: Date
  },
});

Patios.attachSchema(Patios.schema);

Patios.publicFields = {
    name: 1,
    createdAt: 1
};

Patios.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});
