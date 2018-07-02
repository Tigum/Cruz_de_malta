import { Meteor } from 'meteor/meteor'
import { Pendencies } from '../pendencies.js';

Meteor.publish('pendencies', function () {
    return Pendencies.find()
})

