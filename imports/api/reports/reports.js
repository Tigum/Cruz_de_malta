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
  },
  patios: {
    type: [String],
  },
  contractType: {
    type: [String],
  },
  createdAt: {
    type: Date
  },
  contracts: {
    type: [Object]
  },
  'contracts.$.id':{
    type: String,
    optional: true,
  },
  'contracts.$.date':{
    type: String,
    optional: true,
  },
  'contracts.$.month':{
    type: String,
    optional: true,
  },
  'contracts.$.renavam':{
    type: String,
    optional: true,
  },
  'contracts.$.chassis':{
    type: String,
    optional: true,
  },
  'contracts.$.patio':{
    type: String,
    optional: true,
  },
  'contracts.$.region':{
    type: String,
    optional: true,
  },
  'contracts.$.balance':{
    type: String,
    optional: true,
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
