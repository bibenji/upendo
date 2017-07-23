import React from 'react';
import Reflux from 'reflux';
import Store from '../../tools/store/store';

import CustomAxios from '../../tools/connectivity/api';

import GenericInput from '../generic/genericInput';

export default class Settings extends Reflux.Component {
	constructor(props) {
		super(props);
		this.state = {
			userData: null
		};
		this.store = Store;
	}
	
	componentDidMount() {		
		this.getUser();
	}
	
	getUser() {		
		const that = this;
						
		CustomAxios.get('/users/'+this.state.user.id, {params: {'apikey': this.state.user.apikey}})
		.then(function(response) {			
			if (response.status === 200) {				
				that.setState({
					userData: response.data					
				})
			}
		});		
	}
	
	updateField(event) {		
		let updatedUser = this.state.userData;		
		const splitedIndex = event.target.id.split('.');
				
		if (splitedIndex.length === 2) {
			const value = (splitedIndex[1] == 'searchingAgeMin' || splitedIndex[1] == 'searchingAgeMax' ? Number(event.target.value) : event.target.value);				
			updatedUser[splitedIndex[0]][splitedIndex[1]] = value;
		} else {			
			updatedUser[event.target.id] = event.target.value;
		}
		
		this.setState({
			userData: updatedUser
		});		
	}
	
	updateSettingsHandler(event) {		
		event.preventDefault();		
				
		CustomAxios.put('/users/'+this.state.userData.id+'?apikey='+this.state.user.apikey, this.state.userData)
		.then(function(response) {			
			if (response.status === 200) {
				// TODO redirection or something else
			}
		});			
	}
		
	render() {
		if (this.state.userData) {
			const generals = this.state.userData;
			const criteria = this.state.userData.profile;
			
			return (
				<div>
					<h2>Settings</h2>					
					<form onSubmit={this.updateSettingsHandler.bind(this)}>
						<hr />
						<h4>Criteria</h4>
						<GenericInput name="profile.searchingGender" type="select" options={[{value: "M", displayValue: "Men"}, {value: "W", displayValue: "Women"}, {value: "B", displayValue: "Both"}]} value={criteria.searchingGender} onChange={this.updateField.bind(this)} />
						<GenericInput name="profile.searchingAgeMin" value={criteria.searchingAgeMin} onChange={this.updateField.bind(this)} />
						<GenericInput name="profile.searchingAgeMax" value={criteria.searchingAgeMax} onChange={this.updateField.bind(this)} />
						<input className="btn btn-primary float-right" type="submit" />
						<div className="clearfix"></div>
						<hr />
						<h4>General</h4>
						<GenericInput name="username" value={generals.username} onChange={this.updateField.bind(this)} />
						<GenericInput name="email" value={generals.email} onChange={this.updateField.bind(this)} />
						<GenericInput name="gender" type="select" options={[{value: "M", displayValue: "Man"}, {value: "W", displayValue: "Woman"}]} value={generals.gender} onChange={this.updateField.bind(this)} />
						<GenericInput name="phone" value={generals.phone} onChange={this.updateField.bind(this)} />
						<GenericInput name="firstname" value={generals.firstname} onChange={this.updateField.bind(this)} />
						<GenericInput name="lastname" value={generals.lastname} onChange={this.updateField.bind(this)} />											
						<input className="btn btn-primary float-right" type="submit" />
						<br /><br />
					</form>					
				</div>
			);
		} else {
			return (			
				<div>
					<h2>Settings</h2>
					Loading...
				</div>
			);
		}		
		
		
	}
}