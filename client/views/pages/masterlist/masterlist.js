Template.masterlist.helpers({
  selector: function () {
    return {project:Session.get('active_project')};
  },
  settings: function() {
    return {
      collection: Prospects,
      rowsPerPage: 10,
      showFilter: true,
      fields: [
        {
          'key': 'address.fullAddress',
          label: 'Address'
        },
        {
          'key': 'address.street',
          label: 'Street'
        }, {
          'key': 'address.unit',
          label: 'Unit'
        }, {
          'key': 'address.city',
          label: 'City'
        }, {
          'key': 'address.state',
          label: 'State'
        }, {
          'key': 'address.zip',
          label: 'Zip/PC'
        }, {
          'key': 'contacts.0.name',
          label: 'Name'
        }, {
          'key': 'contacts.0.phone',
          label: 'Phone'
        }, {
          'key': 'contacts.0.notes',
          label: 'Notes'
        }
      ]
    };
  }
});

Template.listN.helpers({
  listName: function() {
  return Lists.findOne({_id:this.listId});
}
});

Template.deleteProspect.helpers({
  isOwner: function() {
    var project = Projects.findOne({_id:Session.get('active_project')});
    return Meteor.userId() === project.userId;
  }
});



Template.masterlist.events({
  'click .homeLink' : function(){
    Session.set('in_project', false);
  }



});
