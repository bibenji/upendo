import React from 'react';

import { Link } from 'react-router-dom';

export default class ProfilesList extends React.Component {
	constructor(props) {
		super(props);		
	}	
	
	renderProfiles() {
		return this.props.profiles.map((profile, index) => {
			return (
				<div key={index} className="profileContainer col-md-3">
					<Link to={`/profiles/${profile.username}/${profile.id}`}>					
						<img src="https://unsplash.it/200/200" className="img-thumbnail" /><br />
						{profile.username}, {profile.gender}						
					</Link>
					<br />
					<br />
				</div>
			);
		});
	}
	
	render() {
		return (
			<div>				
				<h2>Profiles</h2>
				
				<div className="row">				
					{this.renderProfiles()}
				</div>				
			</div>
		)
	}
}