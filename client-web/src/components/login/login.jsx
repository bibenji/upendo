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
			<div className="row">
				<div className="col-md-3"></div>
				<div className="col-md-6">
					<h2 className="text-right">Login</h2>
					<div className="card">
						<div className="card-block">
							<form onSubmit={this.submitForm.bind(this)} className="form">

								<div className="form-group">
									<label>Username</label>
									<input id="username" type="text" className="form-control" placeholder="Username" value={this.state.username} onChange={this.updateState.bind(this)} />
								</div>

								<div className="form-group">
									<label>Password</label>
									<input id="password" type="password" className="form-control" placeholder="Password" value={this.state.password} onChange={this.updateState.bind(this)} />
								</div>

								<input className="btn btn-primary float-right" type="submit" value="Login" />

							</form>
						</div>
					</div>
				</div>
				<div className="col-md-3"></div>
			</div>
		)
	}
}