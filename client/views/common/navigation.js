Template.navigation.rendered = function(){

    // Initialize metisMenu
    $('#side-menu').metisMenu();

};

Template.navigation.helpers({

    inProject:function () {
     if(Session.get('in_project')) {
       return true;
     }
    }

});

Template.navigation.events({

  'click .dashboardBtn' : function(){
    Session.set('in_project', false);
  }


});
