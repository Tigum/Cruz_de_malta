import { Accounts } from 'meteor/accounts-base';

Accounts.onCreateUser((options, user) => {
  user.name = options.name;
  user.email = options.surname;
  user.password = options.password;
  user.confirmpassword = options.confirmpassword;
  
  return user;
});

