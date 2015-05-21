Template.registerHelper('Config', function() {
  return Config;
});

Template.registerHelper('NCSchemas', function() {
  return NCSchemas;
});

Template.registerHelper('socialMedia', function() {
  return _.map(Config.socialMedia, function(obj) {
    return obj;
  });
});
