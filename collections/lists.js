Lists = new Meteor.Collection("lists");



Schemas.Lists = new SimpleSchema({
  name: {
    type: String,
    max: 100
  },
  projectId: {
    autoform: {
      omit: true
    },
    type: String
  },
  assignedTo: {
    autoform: {
      omit: true
    },
    optional: true,
    type: String
  },
  createdAt: {
    autoform: {
      omit: true
    },
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date();
      }
    }
  },
  updatedAt: {
    autoform: {
      omit: true
    },
    type: Date,
    optional: true,
    autoValue: function() {
      if (this.isUpdate) {
        return new Date();
      }
    }
  },
  assignedAt: {
    autoform: {
      omit: true
    },
    type: Date,
    optional: true,
  }
});

Lists.attachSchema(Schemas.Lists);

Lists.allow({
  insert: function(){
    return true;
  },
  update: function(){
    return true;
  },
  remove: function(){
    return true;
  }
});
