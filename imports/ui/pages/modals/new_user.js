import './new_user.html';

Template.new_user.onCreated(function () {
    this.autorun(() => {
        this.subscribe('user', Meteor.userId())
    })
})

Template.new_user.events({
    'click .buttonModalSave'(event, template) {
        event.preventDefault();
        const name = $('.name-input').val()
        const email = $('.email-input').val()
        const password = $('.password-input').val()
        const confirmPassword = $('.confirm-password-input').val()

        if (password != confirmPassword) return alert('Confirmação do password incorreta')

        const user = {
            name: name,
            email: email,
            password: password,
            confirmpassword: confirmPassword
        }

        Meteor.call('user.insert', user)
        alert('Usuário ' + name + ' criado com sucesso!')
    },
})