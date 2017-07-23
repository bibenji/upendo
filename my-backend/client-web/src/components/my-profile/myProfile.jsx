import React from 'react';
import Reflux from 'reflux';
import Store from '../../tools/store/store';

import { Link, Route } from 'react-router-dom';

import CustomAxios from '../../tools/connectivity/api';

import ProfileShow from '../profiles/profileShow';
import ProfileEdit from './profileEdit';
import UploadPhotos from './uploadPhotos';

export default class MyProfile extends Reflux.Component {
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
	
	updateProfile(event) {			
		let updatedUser = this.state.userData;		
		const splitedIndex = event.target.id.split('.');
				
		if (splitedIndex.length == 2) {					
			updatedUser.profile[splitedIndex[0]][splitedIndex[1]] = event.target.value;
		} else {			
			const value = (event.target.id == 'size' || event.target.id == 'weight' ? Number(event.target.value) : event.target.value);				
			updatedUser.profile[event.target.id] = value;
		}
		
		this.setState({
			userData: updatedUser
		});
	}
	
	updateProfileHandler(event) {
		event.preventDefault();		
		
		CustomAxios.put('/profiles/'+this.state.userData.profile.id+'?apikey='+this.state.user.apikey, this.state.userData.profile)
		.then(function(response) {			
			if (response.status === 200) {
				// TODO redirection or something else
			}
		});	
	}
		
	render() {		
		return (
			<div>
				
				{this.props.match.isExact ?
					<div className="float-right">
						<Link to='/my-profile/edit'>Edit</Link>
						&nbsp;&nbsp;&nbsp;
						<Link to='/my-profile/upload-photos'>Manage Photos</Link>
					</div>
				:
					<Link className="float-right" to='/my-profile'>Show</Link>
				}								
				
				<h2>My Profile</h2>					
				
				<hr />
					{this.state.userData ?
						(this.props.match.isExact ?
							<ProfileShow
								user={this.state.userData}
							/>				
						:
							(this.props.location.pathname === '/my-profile/edit' ?
								<ProfileEdit
									user={this.state.userData}
									updateProfile={this.updateProfile.bind(this)}
									updateProfileHandler={this.updateProfileHandler.bind(this)}
								/>									
							:
								<UploadPhotos
									user={this.state.userData}
								/>
							)
						)
					: null}
			</div>
		)
	}
}