import { Meteor } from 'meteor/meteor'
import { Patios } from '../patios.js';

Meteor.publish('patios', function () {
    return Patios.find()
})

