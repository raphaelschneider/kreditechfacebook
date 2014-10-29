var fs 			= require('fs');
var fb 			= require('fb');
var events 		= require('events');
var Config  	= require('./config');
var User    	= require('./user');
var CSV			= require('./csv');
var FTPClient	= require('./ftp');


if(process.argv[2] == undefined) {
	console.log("\nUsage: " + process.argv[0] + " " + process.argv[1] + " [ftp password]\n\n");
	return -1;
}

Config.FTP_PASSWORD = process.argv[2].trim();

var csv 	= new CSV();
var user 	= new User()
var ftp		= new FTPClient();

user.on('fbSearchFinished', function(user) {
	
	// When fbSearchFinished is emitted, sort and write CSV file
	
	console.log("\n\nFinished Facebook Search...\n");
	
	this.sortUsers();
	csv.appendUsersToFile(this.users);
	
});

csv.on('finishedWritingCSV', function() {
	
	// When finishedWritingCSV is emitted, upload file to server
	
	console.log("\nFinished writing CSV, uploading it to server...\n")
	
	ftp.uploadCSV();

});

ftp.on('done', function() {
	
	console.log("Finished uploading.\n\n");
	
});

// Populate array with the IDs we're looking for

var idsLookedFor = [];

for(var i = 1; i <= Config.MAX_ID; i++)
	idsLookedFor.push(String(i));


idsLookedFor.forEach(function(id) {
	var url = id;

	fb.api(url, function(data, err) {
    	if (data) {	
	
			// Add everything to user.users[], we'll clean it up later
			
			user.addUser(data.id, data.name, id);
    	}	
	});		
});
