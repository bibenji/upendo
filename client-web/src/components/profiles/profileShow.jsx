import React from 'react';
import Reflux from 'reflux';
import Store from '../../tools/store/store';
import moment from 'moment';

import CustomAxios from '../../tools/connectivity/api';

const Styles = {
	imgContainerStyle: {
		textAlign: 'center'
	},
	imgStyle: {
		margin: '5px'
	}
};

export default class ProfileShow extends Reflux.Component {
	constructor(props) {
		super(props);
		this.state = {
			userData: this.props.user,
			relation: null,
			hasSomeoneLiked: false,
			hasSomeoneDisliked: false,
			messageToDisplay: null,
			currentDiapoPhoto: 0
		};
		this.store = Store;
	}
	
	componentDidMount() {
		if (this.props.user.relations[this.state.user.id]) {
			this.updateState(this.props.user.relations[this.state.user.id]);
		}			
	}
	
	updateState(relation) {		
		let hasSomeoneLiked = false;			
		let hasSomeoneDisliked = false;
		let messageToDisplay = null;
		
		if (relation.status === "1") {			
			if (relation.lastActionUserId === this.state.user.id) {				
				hasSomeoneLiked = "user";
				messageToDisplay = "You liked!";
			} else {
				hasSomeoneLiked = "other";
				messageToDisplay = "You're liked!";
			}			
		} else if (relation.status === "2") {
			hasSomeoneLiked = "user";
			messageToDisplay = "You liked each other, retrieve this person in the affinities section!";		
		} else if (relation.status === "3") {
			if (relation.lastActionUserId === this.state.user.id) {
				hasSomeoneDisliked = "user";
				messageToDisplay = "You disliked!";
			} else {
				hasSomeoneDisliked = "other";
				messageToDisplay = "You're disliked!";
			}
		}		
		
		this.setState({
			userData: this.props.user,
			relation: relation,
			hasSomeoneLiked: hasSomeoneLiked,
			hasSomeoneDisliked: hasSomeoneDisliked,
			messageToDisplay: messageToDisplay
		});		
	}
	
	sendRelation(relationStatus) {		
		const that = this;
		const connectedUserId = "/users/"+this.state.user.id;
		const otherUserId = this.state.userData['@id'];
		
		if (this.state.relation) {
			CustomAxios.put('/relations/'+this.state.relation.id+'?apikey='+this.state.user.apikey, {status: relationStatus, lastActionUserId: this.state.user.id})
			.then(function(response) {			
				console.log(response);
				if (response.status === 200) {									
					const relation = {
						id: response.data.id,				
						lastActionUserId: response.data.lastActionUserId,
						status: response.data.status,
						currentUser: (response.data.userOne.id === that.state.user.id ? response.data.userTwo : response.data.userOne),
						otherUser: (response.data.userOne.id !== that.state.user.id ? response.data.userOne : response.data.userTwo),	
					};
					that.updateState(relation);					
				}
			});								
		} else {					
			let newRelation = {			
				userOne: (connectedUserId < otherUserId ? connectedUserId: otherUserId),
				userTwo: (connectedUserId > otherUserId ? connectedUserId: otherUserId),
				lastActionUserId: this.state.user.id,
				status: relationStatus
			};
					
			CustomAxios.post('/relations?apikey=' + this.state.user.apikey, newRelation)
			.then(function(response) {
				console.log(response);
				if (response.status === 200) {
					const relation = {
						id: response.data.id,				
						lastActionUserId: response.data.lastActionUserId,
						status: response.data.status,
						currentUser: (response.data.userOne.id === that.state.user.id ? response.data.userTwo : response.data.userOne),
						otherUser: (response.data.userOne.id !== that.state.user.id ? response.data.userOne : response.data.userTwo),	
					};
					that.updateState(relation);			
				}
			});			
		}							
	}

	changeCurrentDiapoPhoto(direction) {
		let newCurrentDiapoPhoto = 0;

		if (direction === "prev") {
			if (this.state.currentDiapoPhoto !== 0) {
				newCurrentDiapoPhoto = --this.state.currentDiapoPhoto;
			} else {
                newCurrentDiapoPhoto = this.state.userData.photos.length-1;
			}
		}

		if (direction === "next") {
            if (this.state.currentDiapoPhoto === this.state.userData.photos.length-1) {
            	newCurrentDiapoPhoto = 0;
            } else {
				newCurrentDiapoPhoto = ++this.state.currentDiapoPhoto;
			}
		}

		let newState = this.state;
		newState.currentDiapoPhoto = newCurrentDiapoPhoto;

		this.setState(newState);
	}

	openDiaporama(event, nbPhoto) {
		event.preventDefault();

		this.setState({
			currentDiapoPhoto: nbPhoto
		});

		const options = [];

		$('#diaporamaModal').modal(options);
	}

	render() {
		if (this.state.userData) {
			
			const user = this.state.userData;
			const profile = this.state.userData.profile;

			return (
				<div>

					<div
						id="diaporamaModal"
						className="modal fade diapo-photos"
						tabindex="-1"
						role="dialog"
						aria-labelledby="myLargeModalLabel"
						aria-hidden="true"
						// ref={(modal) => {this.diaporama = modal}}
					>
						<div className="modal-dialog modal-lg">
							<div className="modal-content">
								<img src={"http://assets.upendo.localhost"+user.photos[this.state.currentDiapoPhoto].path} className="img-thumbnail" />
								<div className="text-center">
									<button onClick={() => this.changeCurrentDiapoPhoto("prev")} className="btn">Previous</button>
									&nbsp;&nbsp;&nbsp;
									<button onClick={() => this.changeCurrentDiapoPhoto("next")} className="btn">Next</button>
								</div>
							</div>
						</div>
					</div>

                    {this.state.userData.id !== this.state.user.id ?
						<div className="row" style={{marginTop: '-5px'}}>
							<div className="col-md-12 text-md-center">
								{this.state.messageToDisplay ? (<div className="mb-2">{this.state.messageToDisplay}</div>) : null}
								<button className={this.state.hasSomeoneLiked ? (this.state.hasSomeoneLiked === 'user' ? "btn btn-sm btn-outline-success disabled" : "btn btn-sm btn-outline-success") : "btn btn-sm btn-outline-success"} onClick={() => this.sendRelation("1")}>Like</button>
								&nbsp;&nbsp;&nbsp;
                            	<button className={this.state.hasSomeoneDisliked ? (this.state.hasSomeoneDisliked === 'user' ? "btn btn-sm btn-outline-danger disabled" : "btn btn-sm btn-outline-danger") : "btn btn-sm btn-outline-danger"} onClick={() => this.sendRelation("3")}>Dislike</button>
								<hr />
							</div>
						</div>
                        : null}

					<div className="row">													
						
						{user.photos.length > 0 ?						
							<div className="col-md-4">
								<div className="row">
									{user.photos.map((photo, index) => {
										if (index === 0) {
											return (
												<div key={index} className="col-md-12">
													<a href="#" onClick={(event) => this.openDiaporama(event, index)}>
														<img src={"http://assets.upendo.localhost"+photo.path} className="img-thumbnail" />
													</a>
												</div>
											);
										} else {
											return (
												<div key={index} className="col-md-6">
													<a href="#" onClick={(event) => this.openDiaporama(event, index)}>
														<img src={"http://assets.upendo.localhost"+photo.path} className="img-thumbnail" />
													</a>
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
									
									<ul>
										<li>Music: {profile.profileLikes.music}</li>
										<li>Cinema: {profile.profileLikes.cinema}</li>
										<li>Books: {profile.profileLikes.books}</li>
										<li>Traveling: {profile.profileLikes.hobbies}</li>
										<li>Television: {profile.profileLikes.traveling}</li>
										<li>Sports: {profile.profileLikes.television}</li>
									</ul>						
									
									<h4>Answers</h4>
									<hr />

									<ul>
										<li>Proudest of: {profile.profileAnswers.proudest_of}</li>
										<li>Dream life: {profile.profileAnswers.dream_life}</li>											
									</ul>

								</div>
								<div className="col-md-5">
									<h4>Profile Infos</h4>
									<hr />
									<p>Born: {profile.birthdate ? moment(profile.birthdate).format('d/M/Y') : 'No birthdate'}</p>
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
			)
			
		} else {
			
			return (
				<div>Loading...</div>
			)
			
		}		
	}
}