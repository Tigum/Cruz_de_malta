import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

class RegionsCollection extends Mongo.Collection {
  insert(doc, callback) {
    doc.createdAt = doc.createdAt || new Date();
    return super.insert(doc, callback);
  }
}

export const Regions = new RegionsCollection('Regions');

Regions.schema = new SimpleSchema({

  name: {
    type: String,
  },
  price: {
    type: Number,
    decimal: true
  },
  createdAt: {
    type: Date,
  },
});

Regions.attachSchema(Regions.schema);

Regions.publicFields = {
  name: 1,
  price: 1,
  createdAt: 1
};
