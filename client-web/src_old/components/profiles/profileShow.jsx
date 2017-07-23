import React from 'react';

const Styles = {
	imgContainerStyle: {
		textAlign: 'center'
	},
	imgStyle: {
		margin: '5px'
	}
};

export default class ProfileShow extends React.Component {
	constructor(props) {
		super(props);		
	}	
	
	render() {
		const user = this.props.user;
		const profile = (this.props.user && this.props.user.profile ? this.props.user.profile : null);
		
		return (
			<div>
				{user ?
					<div>
						<div className="row">							
							<div className="col-md-4" style={Styles.imgContainerStyle}>								
								<img src="https://unsplash.it/300/300" width="300px" height="300px" style={Styles.imgStyle} />								
								<img src="https://unsplash.it/150/150" width="150px" height="150px" />
								<img src="https://unsplash.it/150/150" width="150px" height="150px" />
								<img src="https://unsplash.it/150/150" width="150px" height="150px" />
								<img src="https://unsplash.it/150/150" width="150px" height="150px" />
								<br /><br />
							</div>
							<div className="col-md-8">
								<h2>{user.username} ({user.firstname})</h2>	
								<br />
								{profile ?
								<div className="row">
									<div className="col-md-7">								
										<h4>Description</h4>
										<hr />
										<p>{profile.description}</p>							
										<h4>Likes</h4>
										<hr />
										<p>
											<ul>
												<li>Music: {profile.profileLikes.music}</li>
												<li>Cinema: {profile.profileLikes.cinema}</li>
												<li>Books: {profile.profileLikes.books}</li>
												<li>Traveling: {profile.profileLikes.hobbies}</li>
												<li>Television: {profile.profileLikes.traveling}</li>
												<li>Sports: {profile.profileLikes.television}</li>
											</ul>						
										</p>
										<h4>Answers</h4>
										<hr />
										<p>
											<ul>
												<li>Proudest of: {profile.profileAnswers.proudest_of}</li>
												<li>Dream life: {profile.profileAnswers.dream_life}</li>											
											</ul>
										</p>
									</div>
									<div className="col-md-5">
										<h4>Profile Infos</h4>
										<hr />
										<p>Born: {profile.birthdate ? profile.birthdate : 'No birthdate'}</p>
										<p>Size: {profile.size ? profile.size+' cm' : 'No size'}</p>
										<p>Weight: {profile.weight ? profile.weight+' kg' : 'No weight'}</p>
										<p>Eyes color: {profile.eyesColor ? profile.eyesColor : 'No eyes color'}</p>
										<p>Hair color: {profile.hairColor ? profile.hairColor : 'No hair Color'}</p>
									</div>
								</div>
								: null}
							</div>
						</div>
					</div>
				: 'Error'}
			</div>
		)
	}
}