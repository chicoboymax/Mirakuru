Accounts.config({
  sendVerificationEmail: true
});

if (Meteor.isClient) {
  Meteor.startup(function() {
    if (Config.username) {
      return AccountsEntry.config({
        homeRoute: '/',
        dashboardRoute: '/dashboard',
        profileRoute: 'profile',
        passwordSignupFields: 'USERNAME_AND_EMAIL'
      });
    } else {
      return AccountsEntry.config({
        homeRoute: '/',
        dashboardRoute: '/dashboard',
        profileRoute: 'profile',
        passwordSignupFields: 'EMAIL_ONLY'
      });
    }
  });
}
