Meteor.methods({
  'saveList':function(list, projectid){
    check(list.name,String);
    list.projectId = projectid;
    list.createdAt = new Date();
    list.updatedAt = new Date();
    list.assignedAt = "";
    list.assignedTo = "";
    return Lists.insert(list);
  },
  'removeList':function(id){

    return Lists.remove({_id:id});
  },
  'updateListName': function (id, name) {

    return Lists.update({_id: id}, {$set: {name: name}});
  },
  'assignUser':function(listid,userId){
    var list = Lists.findOne({_id:listid});
    if(!list){
      throw new Meteor.Error(404,"No Such List !");
    }
    if(list.assignedTo !== userId && userId){
      var assignmentDate = new Date();
      Lists.update(listid,{$set:{assignedTo:userId}});
      Lists.update(listid,{$set:{assignedAt:assignmentDate}});
    }

  },
  'removeAssignment':function(listid,userId){
    var list = Lists.findOne({_id:listid});
    if(!list){
      throw new Meteor.Error(404,"No Such List !");
    }
    Lists.update(listid,{$set:{assignedTo:""}});
    Lists.update(listid,{$set:{assignedAt:""}});
  }
});
