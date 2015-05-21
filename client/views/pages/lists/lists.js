AutoForm.hooks({
  add: {
    onError: function(operation, error) {
      return App.alertError(error);
    }
  },
  addProspectForm: {
    onError: function(operation, error) {
      return App.alertError(error);
    }
  },
  addProspectForm:{
    before: {
    insert: function(doc) {
      doc.project = Session.get('active_project');

      return doc;
    }
  }
},
addProspectFormGoogle:{
  before: {
  insert: function(doc) {
    doc.project = Session.get('active_project');

    return doc;
  }
}
}
});


Template.lists.helpers({
  prospect: function() {
    return Prospects.find();
  },
  listToDelete:function(){
    return Session.get('listToDelete');
  },
  list: function() {
    return Lists.find();
  },
  isOwner: function() {
      var project = Projects.findOne({_id:Session.get('active_project')});
      return Meteor.userId() === project.userId;
    }
});

Template.assigned.helpers({
  members: function() {
    var project = Projects.findOne({_id:Session.get('active_project')});
    return Meteor.users.find({_id:{$in:project.members}});
  },
  assignedTo:function(){
    var list = Lists.findOne({_id:this._id});
    return Meteor.users.find({_id:list.assignedTo});
  },
  isOwner: function() {
      var project = Projects.findOne({_id:Session.get('active_project')});
      return Meteor.userId() === project.userId;
    }
});


Template.assigned.events({
  'click .assignUser':function(evt,tmpl){
    var user = tmpl.find('.userToAssign').value;
    var list = $(evt.currentTarget).closest('.eachList').attr('value');
    Meteor.call('assignUser',list,user);
  },
  'click .removeAssignment':function(evt,tmpl){
    var user = this._id;
    var list = $(evt.currentTarget).closest('.eachList').attr('value');
    Meteor.call('removeAssignment',list,user);
  }
})



Template.lists.events({
  'keyup input[type=text]':function(event,tmpl){
    if(event.which === 27 || event.which === 13){
      event.preventDefault();
      var list = {};
      list.name = tmpl.find('#listNameEnter').value;
      var project = Session.get('active_project');
      Meteor.call('saveList',list,project);
    }
  }
});
