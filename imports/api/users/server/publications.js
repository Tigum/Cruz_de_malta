import { Meteor } from 'meteor/meteor'

Meteor.publish("user", function user(userId) {
    // if (!userId) return this.error(new Meteor.Error("unauthenticated", "Not logged in")); 
    return Meteor.users.find({ _id: userId });
});