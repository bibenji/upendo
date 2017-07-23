module.exports = {
	saveUser: function(user) {		
		localStorage.setItem('upendoUserData', JSON.stringify(user));
	},

	getUser: function() {		
		return JSON.parse(localStorage.getItem('upendoUserData'));
	},

	deleteUser: function() {		
		delete localStorage.upendoUserData;
	}
};