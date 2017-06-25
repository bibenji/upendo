import React from 'react';

import { Route } from 'react-router-dom';

import CustomAxios from '../../tools/connectivity/api';

import ProfilesList from './profilesList';
import ProfilesShow from './profilesShow';

export default class ProfilesContainer extends React.Component {
	constructor(props) {		
		super(props);
		this.state = {profiles: []};
	}
	
	componentDidMount() {		
		const that = this;

		CustomAxios.get('/users', {params: this.props.axiosParams})
		.then(function(response) {
			if (response.status === 200) {
				that.setState({
					profiles: response.data['hydra:member']
				})
			}
		});
	}	
	
	getProfilesListComponent(props) {
		return (
			<ProfilesList
				profiles={this.state.profiles}
				{...props}
			/>
		);
	}
	
	getProfilesShowComponent(props) {
		return (
			<ProfilesShow
				axiosParams={this.props.axiosParams}
				{...props}
			/>
		);		
	}
	
	render() {
		return (
			<div>				
				<Route path={`${this.props.match.url}/:profileName/:profileId`} render={this.getProfilesShowComponent.bind(this)} />
				<Route exact path={this.props.match.url} render={this.getProfilesListComponent.bind(this)} />
			</div>
		)
	}
}