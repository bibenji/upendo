import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

export default class ProfilesList extends React.Component {
	constructor(props) {
		super(props);		
	}	
	
	renderProfiles() {
		return this.props.profiles.map((profile, index) => {
			return (
				<div key={index} className="profileContainer col-md-3">
					<Link style={{color: (profile.gender === 'M' ? '#4183D7' : '#D24D57')}} to={`/profiles/${profile.username}/${profile.id}`}>					
						<img src="https://unsplash.it/200/200" className="img-thumbnail" /><br />
						{profile.username}, {profile.gender}<br />
						{moment().diff(profile.profile.birthdate, 'years')} years old
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