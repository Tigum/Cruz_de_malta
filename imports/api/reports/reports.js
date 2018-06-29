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
  contractStatus: {
    type: String,
  },
  createdAt: {
    type: Date
  },
  date: {
    type: String
  },
  balance: {
    type: Number,
    decimal: true
  },
  contracts: {
    type: [Object]
  },
  'contracts.$._id':{
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
  'contracts.$.balance':{
    type: String,
    optional: true,
  },
  'contracts.$.createdAt':{
    type: Date,
    optional: true,
  },
  'contracts.$.plate':{
    type: String,
    optional: true,
  },
  'contracts.$.profitable':{
    type: Boolean,
    optional: true,
  },
  'contracts.$.region':{
    type: Object,
    optional: true,
  },
  'contracts.$.region.name':{
    type: String,
    optional: true,
  },
  'contracts.$.region.price':{
    type: Number,
    optional: true,
    decimal: true
  },
  'contracts.$.region._id':{
    type: String,
    optional: true,
    decimal: true
  },
  'contracts.$.status':{
    type: String,
    optional: true,
  },
  'contracts.$.value':{
    type: Number,
    optional: true,
    decimal: true
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
