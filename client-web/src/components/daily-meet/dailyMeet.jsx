import React from 'react';
import Reflux from 'reflux';
import Store from '../../tools/store/store';

import CustomAxios from '../../tools/connectivity/api';
import icons from 'glyphicons';

export default class DailyMeet extends Reflux.Component {
	constructor(props) {
		super(props);
		this.state = {
			dailyProfile: null
		};
		this.store = Store;
	}

    componentDidMount() {
        const that = this;

        CustomAxios.get('/daily_profile', {params: {'apikey': this.state.user.apikey}})
            .then(function(response) {
                if (response.status === 200) {
                	console.log(response.data);
                	const jsonData = JSON.parse(response.data)[0];
                	console.log(jsonData);
                	if (jsonData.userOne.id === that.state.user.id) {
                		that.getDailyProfile(jsonData.userTwo.id);
					}
					else {
                		that.getDailyProfile(jsonData.userOne.id);
					}
                }
            });
    }

    getDailyProfile(profileId) {
		const that = this;

        CustomAxios.get('/users/'+profileId, {params: {'apikey': this.state.user.apikey}})
            .then(function(response) {
                if (response.status === 200) {
                    that.setState({
                         dailyProfile: response.data
                    })
                }
            });
	}

    getConversationForDailyProfile() {
        CustomAxios.get('/conversations', {params: {
                apikey: this.state.user.apikey,
                conversation_from_contact: this.state.dailyProfile.id
            }})
            .then(function(response) {
                if (response.status === 200) {
                    const convId = response.data['hydra:member'][0].id;
                    window.location.replace("/messages/"+convId);
                }
            })
        ;
    }

    render() {
		return (
			<div>
				<h2>Rencontre Du Jour</h2>

				<div className="card jumbotron">
					<div className="card-body">
						{this.state.dailyProfile ?
							<div>
								<div className="row">
									<div className="col-md-4 text-center">
										<h2>
											{this.state.dailyProfile.username}
										</h2>
									</div>
								</div>
								<div className="row">
									<div className="col-md-4 text-center">
                                        <img className="image-fit" src={this.state.dailyProfile.mainPhoto !== null ? 'http://assets.upendo.localhost'+this.state.dailyProfile.mainPhoto.path : require('../../resources/img/girl-2.jpg')} />
									</div>
									<div className="col-md-8">
										<p>Profile to display here.</p>

										<button onClick={this.getConversationForDailyProfile.bind(this)} className="btn btn-lg btn-secondary">Start To Talk Now {icons.arrowDoubleR}</button>

									</div>
								</div>
							</div>
						:
							<p>Nothing to show.</p>
						}
					</div>
				</div>

			</div>
		)
	}
}