import React from 'react';
import Reflux from 'reflux';
import Store from '../../tools/store/store';
import { Link } from 'react-router-dom';

import CustomAxios from '../../tools/connectivity/api';

export default class Affinities extends Reflux.Component {
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
		
	renderProfile(relation, index) {		
		return (
			<div key={index} className="col-md-3">
				<Link style={{color: (relation.otherUser.gender === 'M' ? '#4183D7' : '#D24D57')}} to={`/profiles/${relation.otherUser.username}/${relation.otherUser.id}`}>					
					<img src="https://unsplash.it/200/200" className="img-thumbnail" /><br />
					{relation.otherUser.username}				
				</Link>
			</div>
		);		
	}
		
	render() {		
		if (this.state.userData) {
			const relations = this.state.userData.relations;
			let crushes = [];
			let liked = [];
			let beenLiked = [];
			let disliked = [];
			let beenDisliked = [];
			
			Object.keys(relations).map((key, index) => {
				switch (relations[key].status) {					
					case "1" :
						if (relations[key].lastActionUserId !== this.state.user.id) {
							beenLiked.push(relations[key]);
						} else {
							liked.push(relations[key]);
						}
						break;
					case "2" :
						crushes.push(relations[key]);
						break;
					case "3" :
						if (relations[key].lastActionUserId !== this.state.user.id) {
							beenDisliked.push(relations[key]);
						} else {
							disliked.push(relations[key]);
						}
						break;
					default :
						console.log('Error switch affinities.jsx');
				}
			});
			
			return (
				<div>
					<h2>Affinities</h2>
						<hr />
						<h4>Crushes</h4>											
							<div className="row">					
								{crushes.map((relation, index) => {										
									return this.renderProfile(relation, index);
								})}
							</div>							
						
						<hr />
						<h4>They like you</h4>
							<div className="row">
								{beenLiked.map((relation, index) => {
									return this.renderProfile(relation, index);
								})}
							</div>

						<hr />
						<h4>You like</h4>
							<div className="row">
								{liked.map((relation, index) => {
									return this.renderProfile(relation, index);
								})}
							</div>

						<h4 />

						<hr />
						<Link to="/dislikes">See the disliked profiles</Link>

				</div>
			);
			
		} else {
			return (
				<div>
					<h2>Affinities</h2>
					Sorry, nothing to show.
				</div>
			);
		}		
	}
}