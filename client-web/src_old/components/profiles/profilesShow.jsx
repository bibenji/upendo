import React from 'react';

import axios from 'axios';

import CustomAxios from '../../tools/connectivity/api';

import ProfileShow from './profileShow';

const Styles = {
	imgContainerStyle: {
		textAlign: 'center'
	},
	imgStyle: {
		margin: '5px'
	}
};

export default class ProfilesShow extends React.Component {
	constructor(props) {
		super(props);
		this.state = {user: null};
	}
	
	componentDidMount() {		
		const that = this;

		CustomAxios.get('/users/'+this.props.match.params.profileId, {params: this.props.axiosParams})
		.then(function(response) {			
			if (response.status === 200) {				
				that.setState({
					user: response.data
				})
			}
		});
	}	
	
	render() {		
		return (
			<div>
				{this.state.user ?
					<ProfileShow user={this.state.user} />
				: 'Error'}
			</div>
		)
	}
}