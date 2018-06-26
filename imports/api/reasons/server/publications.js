import { Meteor } from 'meteor/meteor'
import { Reasons } from '../reasons.js';

Meteor.publish('reasons', function () {
    return Reasons.find()
})
