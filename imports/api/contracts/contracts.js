import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

class ContractsCollection extends Mongo.Collection {
  insert(doc, callback) {
    doc.createdAt = doc.createdAt || new Date();
    return super.insert(doc, callback);
  }
}

export const Contracts = new ContractsCollection('Contracts');

Contracts.schema = new SimpleSchema({

  plate: {
    type: String,
  },
  renavam: {
    type: String,
    optional: true
  },
  createdAt: {
    type: Date,
    optional: true,
  },
  date: {
    type: String,
    optional: true,
  },
  chassis: {
    type: String,
    optional: true,
  },
  patio: {
    type: String,
    optional: true,
  },
  region: {
    type: Object,
    optional: true,
  },
  'region._id':{
    type: String,
    optional: true,
  },
  'region.name':{
    type: String,
    optional: true,
  },
  'region.price':{
    type: Number,
    optional: true,
    decimal: true
  },
  value: {
    type: Number,
    optional: true,
    decimal: true
  },
  debitsAndCredits: {
    type: [Object],
    optional: true,
    decimal: true
  },
  'debitsAndCredits.$.id':{
    type: String,
    optional: true,
  },
  'debitsAndCredits.$.value':{
    type: Number,
    optional: true,
    decimal: true
  },
  'debitsAndCredits.$.reason':{
    type: String,
    optional: true,
  },
  'debitsAndCredits.$.type':{
    type: String,
    optional: true,
  },
  status: {
    type: String,
    optional: true,
  },
  balance: {
    type: Number,
    optional: true,
    decimal: true
  },
  profitable: {
    type: Boolean,
    optional: true
  }
});

Contracts.attachSchema(Contracts.schema);

Contracts.publicFields = {
    plate: 1,
    renavam: 1,
    createdAt: 1,
    date: 1,
    chassis: 1,
    patio: 1,
    region: 1,
    value: 1,
    debitsAndCredits: 1,
    status: 1,
    balance: 1,
    profitable: 1
};

Contracts.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});
