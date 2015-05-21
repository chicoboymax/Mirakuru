Template.navigation.rendered = function(){

    // Initialize metisMenu
    $('#side-menu').metisMenu();

};

Template.navigation.helpers({

    inProject:function () {
     if(Session.get('active_project')) {
       return true;
     }
    }

});

Template.navigation.events({

  'click .dashboardBtn' : function(){
      Session.set('active_project', '');
  }


});
