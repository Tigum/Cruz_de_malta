import { Meteor } from 'meteor/meteor';
import './login.html';

Template.login.onCreated(function () {
    this.autorun(() => {
        if(Meteor.user()){
            FlowRouter.go('/')
        }
    })
})

Template.login.events({
    'click .login'(event, template) {
        event.preventDefault();
        const user = {
            email: $(".email-input2").val(),
        }
        const password = $(".password-input2").val()
        Meteor.loginWithPassword(user, password, error => {
            if (error) {
                if (error.error == "403") {
                    alert('E-mail ou senha incorreto')
                } else {
                    console.log(error);
                }
                return;
            }
            FlowRouter.go("/");
        });
    },
})