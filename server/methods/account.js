Meteor.methods({
  deleteAccount: function(userId) {
    if (this.userId === userId) {
      return Meteor.users.remove({
        _id: this.userId
      });
    }
  },
  'sendContactEmail': function(name, email, message) {
    this.unblock();

    Meteor.Mailgun.send({
      to: 'recipient@example.com',
      from: name + ' <' + email + '>',
      subject: 'New Contact Form Message',
      text: message,
      html: Handlebars.templates['contactEmail']({siteURL: Meteor.absoluteUrl(), fromName: name, fromEmail: email, message: message})
    });
  },
  'saveProject':function(project){

    check(project.name,String);
    project.userId = Meteor.userId();
    project.dateentered = new Date();
    project.lastupdate = new Date();
    if(!project.datedue){
      project.datedue = new Date();
    }
    project.members = [project.userId];
    return Projects.insert(project);
  },
  'removeProject':function(id){

    return Projects.remove({_id:id});
  },
  'updateProjectName': function (id, name) {

    return Projects.update({_id: id}, {$set: {name: name}});
  },
  'inviteUser':function(projectid,userId){
    var project = Projects.findOne({_id:projectid});
    if(!project || project.userId !== this.userId){
      throw new Meteor.Error(404,"No Such Project !");
    }
    if(userId !== project.userId && !_.contains(project.members,userId)){
      Projects.update(projectid,{$addToSet:{members:userId}});
    }
  },
  'removeInvite':function(projectid,userId){
    var project = Projects.findOne({_id:projectid});
    if(!project || project.userId !== this.userId){
      throw new Meteor.Error(404,"No Such Project !");
    }
    Projects.update(projectid,{$pull:{members:userId}});
  },
  addToRole:function(user,role){
    var loggedInUser = Meteor.user();
    if (!loggedInUser && !Roles.userIsInRole(loggedInUser, ['admin'])) {
          throw new Meteor.Error(403, "Access denied")
        }
      Roles.addUsersToRoles(user,role);
  },
  removeFromRole:function(user,role){
      Roles.removeUsersFromRoles(user,role);
  }
});
