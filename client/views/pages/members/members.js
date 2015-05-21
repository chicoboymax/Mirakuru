Template.members.helpers({
  'userList':function(){
    return Meteor.users.find({},{});
  },
  'members':function(){
    var project = Projects.findOne({_id:Session.get('active_project')});
    return Meteor.users.find({_id:{$in:project.members}});
  },
  'isowner':function(parent){
    return parent.userId === Meteor.userId();
  }
});
Template.members.events({
  'click .userToInvite':function(evt,tmpl){
    var user = evt.target.getAttribute('value');
    //var user = $('.inviteUser').closest('li').attr('value');
    //console.log(user);
    var project = Session.get('active_project');
    Meteor.call('inviteUser',project,user);
  },
  'click .removeUser':function(evt,tmpl){
    var user = this._id;
    var project = Session.get('active_project');
    Meteor.call('removeInvite',project,user);
  }
})

EasySearch.createSearchIndex('users', {
  field: 'username',
  collection: Meteor.users,
  use: 'mongo-db',
  query: function (searchString, opts) {
    // Default query that is used for searching
    var query = EasySearch.getSearcher(this.use).defaultQuery(this, searchString);

    // Make the emails searchable
    query.$or.push({
      emails: {
        $elemMatch: {
          address: { '$regex' : '.*' + searchString + '.*', '$options' : 'i' }
        }
      }
    });

    return query;
  }
});
