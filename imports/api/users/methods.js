import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base'
import './server/users.js';

Meteor.methods({
    'user.insert'(user) {
        Accounts.createUser({
            name: user.name,
            email: user.email,
            password: user.password,
            confirmpassword: user.confirmpassword,
        });
    },
    'user.remove'(userId) {
        Meteor.users.remove({ _id: userId })
    },
    'user.addReportId'(userId, reportId) {
        Meteor.users.update({ _id: userId }, {$set:{reportId:reportId}})
    },
    'user.addReportDetails'(userId, reportDetails) {
        Meteor.users.update({ _id: userId }, {$set:{reportDetails:reportDetails}})
    }

});


