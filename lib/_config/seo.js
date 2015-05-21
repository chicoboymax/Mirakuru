Meteor.startup(function() {
  if (Meteor.isClient) {
    return SEO.config({
      title: this.Config.name,
      meta: {
        description: this.Config.subtitle
      }
    });
  }
});
