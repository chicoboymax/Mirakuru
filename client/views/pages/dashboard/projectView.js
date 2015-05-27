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
  },
  completion: function() {
    var list = Lists.findOne({_id:this._id});
    var prospectsTotal = Prospects.find({listId:this._id}).count();
    var contacted = Prospects.find({$and:[{contacted:true},{listId:this._id}]}).count();
    return Math.round((contacted / prospectsTotal) * 100);
  }
});

Template.fooProspect.rendered = function () {
 $(this.find('.contacted')).bootstrapSwitch();
 var test = this;
 $(this.find('.contacted')).on('switchChange.bootstrapSwitch', function(event, state) {
   Prospects.update(test.data._id, {$set: {contacted:state}});
 });
}
