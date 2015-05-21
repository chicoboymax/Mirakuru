Template.export.events({
  "click .export-data": function(e, t) {
  		e.preventDefault();
      prospects = Prospects.find().fetch();

      prospectsExport = function(cursor, fileType) {
      var data = cursor;
      var exportFields = ["_id","address","project"];

      var str = convertArrayOfObjects(data, exportFields, fileType);

      var filename = "export." + fileType;

      downloadLocalResource(str, filename, "application/octet-stream");
      }

      prospectsExport(prospects,"json");
  	}

});

Template.export.helpers({

});
