Template.projectView.helpers({
  myLists: function() {
    return Lists.find({assignedTo:Meteor.userId()});
  },
  prospectInList: function() {
    var list = Lists.findOne({_id:this._id});
    return Prospects.find({listId:list._id});
  },
  isOwner: function() {
      var project = Projects.findOne({_id:Session.get('active_project')});
      return Meteor.userId() === project.userId;
    }
});
