var fs			= require('fs');
var ftp 		= require('ftp');
var Config		= require('./config');
var util 		= require('util'),
EventEmitter 	= require('events').EventEmitter;

var FTPClient = function() {

	this.credentials = {
	    host: Config.FTP_HOST,
	    user: Config.FTP_USER,
	    password: Config.FTP_PASSWORD
	};

	this.client = client = new ftp();
	
	this.client.on('greeting', function(msg) {
			console.log("Connected to server, MOTD: \n\n" + msg + "\n\n");
	});
	
	
};

util.inherits(FTPClient, EventEmitter);

FTPClient.prototype.uploadCSV = function() {
	
	var self = this;
	
	this.client.on('ready', function() {
		self.client.put(Config.CSV_OUTPUT, Config.CSV_OUTPUT, function(err) {
			if(err) throw err;
			self.client.end();
			self.emit('done'); // Done, finished uploading
		});
	});
	
	this.client.connect(this.credentials);
}

module.exports = FTPClient;