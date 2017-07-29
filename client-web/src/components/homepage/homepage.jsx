import React from 'react';
import Reflux from 'reflux';
import Store from '../../tools/store/store';
import { Link } from 'react-router-dom';

const Styles = {
	imgContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'center',
        // border: '1px solid yellow',
        backgroundImage: 'url('+require("../../resources/img/bg.jpg")+')',
        backgroundSize: 'cover',
        width: '100%',
        height: '500px'
	},
	welcomeText: {
        textAlign: "center",
        fontSize: "200%",
        backgroundColor: "rgba(255,255,255,0.5)",
        padding: "25px"
	}
};

export default class Homepage extends Reflux.Component {
	constructor(props) {
		super(props);
		this.store = Store;
	}

	render() {
		return (
			<div>
				<div style={Styles.imgContainer}>
					<div>
						<div style={Styles.welcomeText}>
							<h2>Home</h2>
							Bienvenue sur Upendo{ this.state.user ? ' '+this.state.user.username : '' }!
						</div>
					</div>
				</div>

				<br />
				<h2>What is Upendo?</h2>
				<p>Upendo is a place where you can meet other people, who, like you, are in search of the One...</p>

				<br />
				<h2>How does it work?</h2>
				<p>Upendo is free! You just have to register and you'll be able to enter in contact with others users of the site. If they like you too, bingo! You'll have the possibility to start a conversation and maybe more...</p>

				<br />
				<h2>Why should I trust you?</h2>
				<p>Because dozens of people are now in love with each others due to Upendo! Just have a look at what they say about us:</p>
				<div className="row">
					<div className="col-md-4">
						<img src="https://unsplash.it/300/300" width="100%" height="300px" />
						<strong>Franck</strong> Really guys, Upendo save my life! In just a few months, I met Emily who is now the mother of my two little monsters! ;-) Upendo rocks!
					</div>

					<div className="col-md-4">
						<img src="https://unsplash.it/300/300" width="100%" height="300px" />
						<strong>Franck</strong> Really guys, Upendo save my life! In just a few months, I met Emily who is now the mother of my two little monsters! ;-) Upendo rocks!
					</div>

					<div className="col-md-4">
						<img src="https://unsplash.it/300/300" width="100%" height="300px" />
						<strong>Franck</strong> Really guys, Upendo save my life! In just a few months, I met Emily who is now the mother of my two little monsters! ;-) Upendo rocks!
					</div>
				</div>

				<br />
				<h2>Lets get started!</h2>
				<p>Start right now to meet new people...</p>
				<div className="text-md-center">
					<Link className="btn btn-lg btn-primary" to="/register">Register</Link>
				</div>
			</div>
		)
	}
}