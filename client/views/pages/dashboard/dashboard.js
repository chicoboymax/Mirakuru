Template.dashboard.events({
  'keyup input[type=text]':function(event,tmpl){
    if(event.which === 27 || event.which === 13){
      event.preventDefault();
      var project = {};
      project.name = tmpl.find('#projectNameEnter').value;
      Meteor.call('saveProject',project);
    }
  },
  'click .deleteConfirmation':function(evt,tmpl){
    evt.preventDefault();
    evt.stopPropagation();
    Session.set('projectToDelete',this._id);
  },
  'click .cancelDelete':function(){
    return Session.set('projectToDelete',null);
  }
});
Template.dashboard.helpers({
  projectToDelete:function(){
    return Session.get('projectToDelete');
  }
});
Template.delconfirm.events({
  'click .deleteConfirmed':function(evt,tmpl){
    Meteor.call('removeProject',Session.get('projectToDelete'));
    Session.set('projectToDelete',null);
  }
});
Template.project.helpers({
  isowner:function(){
    var project = Projects.findOne({_id:this._id});
    return project.userId === Meteor.userId();
  },
  prospectsCount:function() {
    Meteor.subscribe('prospects',this._id);
    var prospects = Prospects.find({project:this._id}).count();
    return prospects;
  }
});
