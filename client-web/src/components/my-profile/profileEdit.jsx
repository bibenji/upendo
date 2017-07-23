import React from 'react';

import GenericInput from '../generic/genericInput';

const Styles = {
	imgContainerStyle: {
		textAlign: 'center'
	},
	imgStyle: {
		margin: '5px'
	}
};

export default class ProfileEdit extends React.Component {
	constructor(props) {
		super(props);		
	}	
	
	render() {
		const user = this.props.user;
		const profile = (this.props.user && this.props.user.profile ? this.props.user.profile : null);
		
		return (
			<div>
				{profile ?
					<div>
						<div className="row">

							{user.photos.length > 0 ?						
								<div className="col-md-4">
									<div className="row">
										{user.photos.map((photo, index) => {
											if (index === 0) {
												return (
													<div key={index} className="col-md-12">
														<img src={"http://localhost/mynewupendo"+photo.path} className="img-thumbnail" />											
													</div>
												);
											} else {
												return (
													<div key={index} className="col-md-6">
														<img src={"http://localhost/mynewupendo"+photo.path} className="img-thumbnail" />											
													</div>
												);
											}									
										})}
									</div>
								</div>
							:					
								<div className="col-md-4" style={Styles.imgContainerStyle}>
									<img src="https://unsplash.it/300/300" width="300px" height="300px" style={Styles.imgStyle} />								
									<img src="https://unsplash.it/150/150" width="150px" height="150px" />
									<img src="https://unsplash.it/150/150" width="150px" height="150px" />
									<img src="https://unsplash.it/150/150" width="150px" height="150px" />
									<img src="https://unsplash.it/150/150" width="150px" height="150px" />
									<br /><br />
								</div>
							}

							<div className="col-md-8">				
								<form onSubmit={this.props.updateProfileHandler}>
									<div className="form-group row">
										<label htmlFor="description" className="col-sm-2 col-form-label">Description</label>
										<div className="col-sm-10">
											<textarea className="form-control" id="description" placeholder="Description" value={profile.description} onChange={this.props.updateProfile}></textarea>
										</div>
									</div>
									
									<hr />
																		
									<GenericInput id="birthdate" label="Birthdate" placeholder="Birthdate" value={profile.birthdate} onChange={this.props.updateProfile} />																		
									<GenericInput id="weight" label="Weight" placeholder="Weight" value={profile.weight} onChange={this.props.updateProfile} />																		
									<GenericInput id="size" label="Size" placeholder="Size" value={profile.size} onChange={this.props.updateProfile} />																		
									
									<div className="form-group row">
										<label htmlFor="eyesColor" className="col-sm-2 col-form-label">Eyes Color</label>
										<div className="col-sm-10">
											<select id="eyesColor" className="form-control" value={profile.eyesColor} onChange={this.props.updateProfile}>
												<option value="blue">Blue</option>
												<option value="brown">Brown</option>
												<option value="gray">Gray</option>
												<option value="green">Green</option>
											</select>
										</div>
									</div>
									
									<div className="form-group row">
										<label htmlFor="hairColor" className="col-sm-2 col-form-label">Hair Color</label>
										<div className="col-sm-10">
											<select id="hairColor" className="form-control" value={profile.hairColor} onChange={this.props.updateProfile}>
												<option value="black">Black</option>
												<option value="brown">Brown</option>
												<option value="blond">Blond</option>
												<option value="auburn">Auburn</option>
												<option value="red">Red</option>
											</select>
										</div>
									</div>
									
									<hr />
									
									<GenericInput id="profileLikes.music" label="Music" placeholder="Nirvana, Daft Punk..." value={profile.profileLikes.music} onChange={this.props.updateProfile} />																		
									<GenericInput id="profileLikes.cinema" label="Cinema" placeholder="Titanic..." value={profile.profileLikes.cinema} onChange={this.props.updateProfile} />																		
									<GenericInput id="profileLikes.books" label="Books" placeholder="War And Peace..." value={profile.profileLikes.books} onChange={this.props.updateProfile} />																		
									<GenericInput id="profileLikes.hobbies" label="Hobbies" placeholder="Going Outside..." value={profile.profileLikes.hobbies} onChange={this.props.updateProfile} />																		
									<GenericInput id="profileLikes.traveling" label="Traveling" placeholder="France..." value={profile.profileLikes.traveling} onChange={this.props.updateProfile} />																		
									<GenericInput id="profileLikes.television" label="Television" placeholder="CNN..." value={profile.profileLikes.television} onChange={this.props.updateProfile} />																		
									<GenericInput id="profileLikes.sports" label="Sports" placeholder="Tennis..." value={profile.profileLikes.sports} onChange={this.props.updateProfile} />																		
										
									<hr />							
									
									<GenericInput id="profileAnswers.proudest_of" label="Proudest of" placeholder="Myself..." value={profile.profileAnswers.proudest_of} onChange={this.props.updateProfile} />																		
									<GenericInput id="profileAnswers.dream_life" label="Dream life" placeholder="Go In Space..." value={profile.profileAnswers.dream_life} onChange={this.props.updateProfile} />																		
																		
									<input className="btn btn-primary float-right" type="submit" />
								</form>																
								<br />
								<br />
							</div>
						</div>
					</div>
				: 'Loading...'}
			</div>
		)
	}
}