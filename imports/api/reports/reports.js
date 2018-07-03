import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

class ReportsCollection extends Mongo.Collection {
  insert(doc, callback) {
    doc.createdAt = doc.createdAt || new Date();
    return super.insert(doc, callback);
  }
}

export const Reports = new ReportsCollection('Reports');

Reports.schema = new SimpleSchema({

  period: {
    type: String,
    optional: true
  },
  patios: {
    type: [String],
    optional: true
  },
  contractStatus: {
    type: String,
    optional: true
  },
  createdAt: {
    type: Date,
    optional: true
  },
  date: {
    type: String,
    optional: true
  },
  balance: {
    type: Number,
    decimal: true,
    optional: true
  },
  contracts: {
    type: [String],
    optional: true
  },
});

Reports.attachSchema(Reports.schema);

Reports.publicFields = {
    name: 1,
};

Reports.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});
