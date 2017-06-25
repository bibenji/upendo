import React from 'react';

import { UserActions } from '../../tools/store/actions';

import CustomAxios from '../../tools/connectivity/api';

export default class Login extends React.Component {
	constructor(props) {		
		super(props);
		this.state = {
			username: '',
			password: '',		
		};		
	}
	
	updateState(event) {
		let updatedState = this.state;
		updatedState[event.target.id] = event.target.value;
		
		this.setState(updatedState);
	}
	
	submitForm(event) {
		event.preventDefault();
		
		CustomAxios.post('/login', this.state)
		.then((response) => {			
			if (response.status === 200) {				
				let data = {
					username: this.state.username,
					apikey: response.data.apikey,
					id: response.data.id
				};
				
				UserActions.loginUser(data);
			}
		});
	}
	
	render() {
		return (
			<div>
				<h2>Login</h2>
				<form onSubmit={this.submitForm.bind(this)} className="form-inline">
										
					<input id="username" type="text" className="form-control" placeholder="Username" value={this.state.username} onChange={this.updateState.bind(this)} /> &nbsp;
				
					<input id="password" type="text" className="form-control" placeholder="Password" value={this.state.password} onChange={this.updateState.bind(this)} /> &nbsp;
					
					<input className="btn btn-primary" type="submit" value="Login" />
				
				</form>				
			</div>
		)
	}
}