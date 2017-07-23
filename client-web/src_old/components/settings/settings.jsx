import React from 'react';

export default class Settings extends React.Component {
	constructor(props) {
		super(props);		
	}
		
	render() {
		return (
			<div>
				<h2>Settings</h2>
				Réglage de compte...
				<ul>
					<li>Mes critères de recher</li>
					<li>Mon compte (username, coordonnées, changer mon mot de passe...)</li>
				</ul>
			</div>
		)
	}
}