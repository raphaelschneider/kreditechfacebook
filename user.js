var config 		= require('./config');
var util 		= require('util');
EventEmitter	= require('events').EventEmitter;

var users 		= [];

var User = function () {
	this.users = users;
};
	
util.inherits(User, EventEmitter);

User.prototype.addUser = function(id, name, index) {
	
		users.push({'id': id, 'name': name, 'index': index});
	
		// When config.MAX_ID (default 30) is reached it's time to stop
		
		if(index == config.MAX_ID)
			this.emit('fbSearchFinished'); //, users[users.length-1]);
}

User.prototype.sortUsers = function() {
	users.sort(function(a, b) { return parseInt(a.index) - parseInt(b.index) });
}

module.exports = User;