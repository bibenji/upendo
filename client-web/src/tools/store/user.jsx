import moment from 'moment'

class User {
	constructor() {
		this.user = user;
		this.isConnected = true;
		this.lastConnection = moment();    
	}
  
	setAttributes(att) {
		this.user.username = att.username ? att.username : this.user.username;
		this.user.firstname = att.firstname ? att.firstname : this.user.firstname;
		// To be continued...
	}	
}

module.exports = User;