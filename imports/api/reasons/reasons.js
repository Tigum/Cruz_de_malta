import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

class ReasonsCollection extends Mongo.Collection {
  insert(doc, callback) {
    doc.createdAt = doc.createdAt || new Date();
    return super.insert(doc, callback);
  }
}

export const Reasons = new ReasonsCollection('Reasons');

Reasons.schema = new SimpleSchema({

  name: {
    type: String,
  },
  createdAt: {
    type: Date
  },
  type: {
    type: String
  }
});

Reasons.attachSchema(Reasons.schema);

Reasons.publicFields = {
    name: 1,
};

Reasons.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});
