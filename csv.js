var fs 		= require('fs');
var config  = require('./config');
var util = require('util'),
EventEmitter = require('events').EventEmitter;

var CSV = function() { 
	
};
	
util.inherits(CSV, EventEmitter);

CSV.prototype.appendUsersToFile = function (users) {
	
	self = this;
	var contents = '';
	
	users.forEach(function(user) {
		
		// Do not append undefined IDs to CSV contents
		
		if(user.id == undefined)
			return;
			
		contents += user.id + "," + user.name + "\n";

	});
	
	fs.writeFile(config.CSV_OUTPUT, contents, function (err) {
		if(err) throw err;
		console.log("\nWriting CSV contents..."
					+ "\n\n--------------------------\n" 
					+ contents + "--------------------------\n\n" 
					+ "to " + config.CSV_OUTPUT);
					
		self.emit("finishedWritingCSV");
	});
	
};

module.exports = CSV;