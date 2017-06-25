import React from 'react';

import CustomAxios from '../../tools/connectivity/api';

export default class Register extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			newUser: {
				username: '',
				gender: 'M',								
				region: 'Paris',
				firstname: '',
				lastname: '',
				phone: '',
				email: '',
				plainPassword: '',
				confirm: '',				
				birthdate: '',
				searchingGender: 'M',													
			}			
		};
	}
	
	updateState(event) {
		let updatedNewUser = this.state.newUser;
		updatedNewUser[event.target.id] = event.target.value;
		
		this.setState({
			newUser: updatedNewUser
		});		
	}
	
	submitForm(event) {
		event.preventDefault();
		
		let validNewUser = this.state.newUser;
		validNewUser['profile'] = {
			birthdate: this.state.newUser.birthdate,
			searchingGender: this.state.newUser.searchingGender
		};
		
		CustomAxios.post('/users', validNewUser)
		.then((response) => console.log(response))
		;		
	}
	
	render() {
		return (
			<div className="row">
				<div className="col-md-3"></div>
				<div className="col-md-6">
					<h2>Register</h2>				
					<div className="card">
						<img className="card-img-top" src="https://unsplash.it/800/200" alt="Card Image Top" />
						<div className="card-block">
							<h4 className="card-title">Start To Use Upendo!</h4>
							<form onSubmit={this.submitForm.bind(this)}>
								<div className="form-group">
									<label>Username</label>
									<input id="username" className="form-control" type="text" value={this.state.username} onChange={this.updateState.bind(this)} />
								</div>
								<div className="form-group">
									<label>Gender</label>
									<select id="gender" className="form-control" value={this.state.gender} onChange={this.updateState.bind(this)}>
										<option value="M">Man</option>
										<option value="W">Woman</option>
									</select>
								</div>
								<div className="form-group">
									<label>Birthdate</label>
									<input id="birthdate" className="form-control" type="text" value={this.state.birthdate} onChange={this.updateState.bind(this)} />
								</div>
								<div className="form-group">
									<label>Interested To Meet</label>
									<select id="searchingGender" className="form-control" value={this.state.searchingGender} onChange={this.updateState.bind(this)}>
										<option value="M">Men</option>
										<option value="W">Women</option>
										<option value="B">Both</option>
									</select>
								</div>
								<div className="form-group">
									<label>Region</label>
									<select id="region" className="form-control" value={this.state.region} onChange={this.updateState.bind(this)}>
										<option value="Paris">Paris</option>
									</select>
								</div>
								<hr />
								<div className="form-group">
									<label>Firstname</label>
									<input id="firstname" className="form-control" type="text" value={this.state.firstname} onChange={this.updateState.bind(this)} />
								</div>
								<div className="form-group">
									<label>Lastname</label>
									<input id="lastname" className="form-control" type="text" value={this.state.lastname} onChange={this.updateState.bind(this)} />
								</div>
								<div className="form-group">
									<label>Phone</label>
									<input id="phone" className="form-control" type="text" value={this.state.phone} onChange={this.updateState.bind(this)} />
								</div>								
								<div className="form-group">
									<label>Email</label>
									<input id="email" className="form-control" type="text" value={this.state.email} onChange={this.updateState.bind(this)} />
								</div>
								<div className="form-group">
									<label>Password</label>
									<input id="plainPassword" className="form-control" type="text" value={this.state.plainPassword} onChange={this.updateState.bind(this)} />
								</div>
								<div className="form-group">
									<label>Confirm</label>
									<input id="confirm" className="form-control" type="text" value={this.state.confirm} onChange={this.updateState.bind(this)} />
								</div>
								<input className="btn btn-primary float-right" type="submit" />
							</form>
						</div>					
					</div>
				</div>
			</div>
		)
	}
}