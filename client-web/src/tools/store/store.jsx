import React from 'react';
import Reflux from 'reflux';

import { UserActions } from './actions';

import * as localStorage from '../localStorage/localStorage';

class Store extends Reflux.Store {
	constructor() {
		super();		
        this.state = {
			user: {
				username: '',
				apikey: ''
			}			
		};
		
		this.loadUser();
		this.listenTo(UserActions.loginUser, this.onLoginUser);
		this.listenTo(UserActions.logoutUser, this.onLogoutUser);
    }
	
	loadUser() {
		const user = localStorage.getUser();
		
		if (user !== null) {
			this.setState({
				user: user
			});
		}		
	}
	
	onLoginUser(data) {				
		this.setState({
			user: data
		}, localStorage.saveUser(data));		
	}
	
	onLogoutUser() {
		this.setState({
			user: {
				username: '',
				apikey: ''
			}
		}, localStorage.deleteUser());
	}
};

export default Store;