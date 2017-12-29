import React from 'react';
import Reflux from 'reflux';
import Store from '../../tools/store/store';

import { Link, Route } from 'react-router-dom';

import CustomAxios from '../../tools/connectivity/api';

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
            	console.log(JSON.parse(response.data));
            	console.log(that.state);
                if (response.status === 200) {
                	const jsonData = JSON.parse(response.data)[0];
                	if (jsonData.userOne.id === that.state.user.id) {
                		that.getDailyProfile(jsonData.userTwo.id);
					}
					else {
                		that.getDailyProfile(jsonData.userOne.id);
					}
                    // that.setState({
                    //     dailyProfile: response.data['hydra:member']
                    // })
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

    render() {
		return (
			<div>
				<h2>Rencontre Du Jour</h2>

				<div className="card jumbotron">
					<div className="card-body">
						{this.state.dailyProfile ?
							<div>
								{this.state.dailyProfile.username}
								<br /><br />
								Profile to display here.
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