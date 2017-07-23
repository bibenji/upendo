import React from 'react';
import Reflux from 'reflux';
import Store from '../../tools/store/store';

export default class Homepage extends Reflux.Component {
	constructor(props) {
		super(props);
		this.store = Store;
	}
		
	render() {
		return (
			<div>
				<h2>Home</h2>
				Bienvenue sur Upendo{ this.state.user ? ' '+this.state.user.username : '' }!					
			</div>
		)
	}
}