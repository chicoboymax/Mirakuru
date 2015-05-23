Template.projectHeading.helpers({
  editing_projectname: function () {
    return Session.get('editing_projectname');
  }
})
Template.projectHeading.events({
  'click .projectNameEdit': function (evt, tmpl) {
    Session.set('editing_projectname', true);
    Meteor.setTimeout(function () {
      $('.form-control.projectName').focus().select();
    }, 250);
  },
  'blur .projectName': function (evt, tmpl) {
    Session.set('editing_projectname', false);
  },
  'keyup .projectName': function (event, tmpl) {
    if (event.which === 27 || event.which === 13) {
      event.preventDefault();
      var ele = tmpl.find('.projectName');
      Meteor.call('updateProjectName', this._id, ele.value);
      Session.set('editing_projectname', false);
    }
  },
  'click .homeLink' : function(){
    Session.set('in_project', false);
  }

});
