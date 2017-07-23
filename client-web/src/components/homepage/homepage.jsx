import React from 'react';
import Reflux from 'reflux';
import Store from '../../tools/store/store';
import axios from 'axios';

export default class Homepage extends Reflux.Component {
	constructor(props) {
		super(props);
		this.store = Store;
	}

	testAxios() {
        axios.get('http://api.upendo.localhost/test')
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            })
		;
    }
		
	render() {
		return (
			<div>
				<h2>Home</h2>
				Bienvenue sur Upendo{ this.state.user ? ' '+this.state.user.username : '' }!
				<button onClick={this.testAxios.bind(this)}>TEST</button>
			</div>
		)
	}
}