Meteor.publish('prospects', function(project) {
  return Prospects.find({project:project});
});
Meteor.publish('projects',function(userId){
  return Projects.find({$or:[{members:this.userId},{userId:this.userId}]});
});
Meteor.publish(null,function(){
  return Meteor.roles.find({});
});
Meteor.publish('directory',function(){
  return Meteor.users.find();
});
Meteor.publish('lists',function(project){
  return Lists.find({projectId:project});
});
