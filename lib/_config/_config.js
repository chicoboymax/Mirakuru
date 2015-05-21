this.Config = {
  name: 'Mirakuru',
  title: 'Prospect lists manager for real world',
  subtitle: 'Simplify your prospecting process',
  logo: function() {
    return '<b>' + this.name + '</b>';
  },
  footer: function() {
    return this.name + ' - Copyright ' + new Date().getFullYear();
  },
  emails: {
    from: 'noreply@' + Meteor.absoluteUrl()
  },
  blog: '',
  about: '',
  username: true,
  homeRoute: '/',
  dashboardRoute: '/dashboard',
  socialMedia: {
    facebook: {
      url: 'http://facebook.com/benjaminpeterjones',
      icon: 'facebook'
    },
    twitter: {
      url: 'http://twitter.com/BenPeterJones',
      icon: 'twitter'
    }
  },
  publicRoutes: ['home']
};
