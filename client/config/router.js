var prepareView, publicRoutes, saveRedirectUrl, signInProhibited, signInRequired;

Router.configure({
  layoutTemplate: "blankLayout",
  loadingTemplate: "loading",
  notFoundTemplate: "notFound",
  routeControllerNameConverter: "camelCase",
  onBeforeAction: function() {
    if (Config.username && Meteor.userId() && !Meteor.user().username) {
      this.redirect('/setUserName');
    }
    return this.next();
  }
});


Router.map(function() {
  this.route("home", {
    path: "/",
    layoutTemplate: "homeLayout",
    fastRender: true
  });
  this.route("dashboard", {
    path: "/dashboard",
    layoutTemplate: "mainLayout",
    fastRender: true,
    waitOn:function(){
      Meteor.subscribe('projects', Meteor.userId());
    },
    onBeforeAction: function() {
      var url;
      url = Session.get('redirectToAfterSignIn');
      if (url) {
        Session.set('redirectToAfterSignIn', null);
        Router.go(url);
      }
      return this.next();
    },
    data: {
      'projects': function(){
        return Projects.find();
      }
    }
  });
  this.route('projectView',{
    path:'/projects/:_id',
    layoutTemplate:'mainLayout',
    fastRender: true,
    loginRequired:'entrySignIn',
    waitOn:function(){
      Meteor.subscribe('prospects',this.params._id);
      Meteor.subscribe('directory');
      Meteor.subscribe('lists',this.params._id);
      return Meteor.subscribe('projects');
    },
    data:function(){
      Session.set('active_project',this.params._id);
      return Projects.findOne({_id:this.params._id});
    },
    onAfterAction:function(){
      SEO.set({
        title:'Project View | ' + SEO.settings.title
      })
    }
  });
  this.route("lists", {
    path: "/projects/:_id/lists",
    layoutTemplate:'mainLayout',
    fastRender: true,
    loginRequired: 'entrySignIn',
    waitOn:function(){
      //Meteor.subscribe('prospects',this.params._id);
      Meteor.subscribe('directory');
      Meteor.subscribe('lists',this.params._id);
      return Meteor.subscribe('projects');

    },
    data:function(){
      Session.set('active_project',this.params._id);
      return Projects.findOne({_id:this.params._id});
    },
    onAfterAction: function() {
      SEO.set({
        title: 'Lists | ' + SEO.settings.title
      });
    }
  });
  this.route("masterlist", {
    path: "/projects/:_id/masterlist",
    layoutTemplate:'mainLayout',
    fastRender: true,
    loginRequired: 'entrySignIn',
    waitOn:function(){
      Meteor.subscribe('prospects',this.params._id);
      Meteor.subscribe('lists',this.params._id);
      return Meteor.subscribe('projects');
    },
    data:function(){
      Session.set('active_project',this.params._id);
      return Projects.findOne({_id:this.params._id});
    },
    onAfterAction: function() {
      SEO.set({
        title: 'Master List | ' + SEO.settings.title
      });
    }
  });
  this.route("profile", {
    path: "/profile",
    layoutTemplate:'mainLayout',
    waitOn: function() {
      return Meteor.subscribe('profilePictures');
    }
  });
  this.route("account", {
    path: "/account",
    layoutTemplate:'mainLayout',
    onStop: function() {
      return Alert.clear();
    }
  });
  return this.route("setUserName", {
    path: "/setUserName",
    onBeforeAction: function() {
      if (!Config.username || (Meteor.userId() && Meteor.user().username)) {
        this.redirect('/dashboard');
      }
      return this.next();
    }
  });

  this.route('roles', {
    path: '/roles',
    layoutTemplate:'mainLayout',
    loginRequired: 'entrySignIn',
    waitOn:function(){
      return Meteor.subscribe('directory');
    }
  });

  this.route('profile', {
    path: '/profile',
    layoutTemplate:'mainLayout',
    data: function() {
      return Meteor.user();
    }
  });

  this.route('notFound', {
    path: '*',
    where: 'server',
    action: function() {
      this.response.statusCode = 404;
      this.response.end(Handlebars.templates['404']());
    }
  });
});

Router.waitOn(function() {
  Meteor.subscribe('user');
  return Meteor.subscribe('userPicture');
});

prepareView = function() {
  var $bd;
  window.scrollTo(0, 0);
  $('body').removeClass('sidebar-active');
  $('.modal-backdrop').removeClass('in');
  $bd = $('.modal-backdrop');
  setTimeout(function() {
    return $bd.remove();
  }, 300);
  return $('body').attr('style', '');
};


Router.onAfterAction(prepareView);

signInRequired = function() {
  AccountsEntry.signInRequired(this);
  if (this.next) {
    return this.next();
  }
};

saveRedirectUrl = function() {
  if (!Meteor.loggingIn()) {
    if (!Meteor.user()) {
      Session.set('redirectToAfterSignIn', this.url);
    }
  }
  return this.next();
};

publicRoutes = _.union(Config.publicRoutes, ['entrySignIn', 'entrySignUp', 'entryForgotPassword']);

Router.onBeforeAction(saveRedirectUrl, {
  except: _.union(publicRoutes, ['entrySignOut'])
});

Router.onBeforeAction(signInRequired, {
  except: publicRoutes
});

signInProhibited = function() {
  if (Meteor.user()) {
    return Router.go('dashboard');
  } else {
    if (this.next) {
      return this.next();
    }
  }
};

Router.onBeforeAction(signInProhibited, {
  only: ['entrySignUp', 'entrySignUp', 'entryForgotPassword']
});
