import { Meteor } from 'meteor/meteor'
import { Regions } from '../regions.js';

Meteor.publish('regions', function () {
    return Regions.find()
})