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
			<div style={{position: "relative"}}>
				<img style={{width: "100%", marginTop: "-25px"}} src={require("../../resources/img/bg.jpg")} />
				<div style={{position: "absolute", top: "0", width: "100%", textAlign: "center", fontSize: "200%", backgroundColor: "rgba(255,255,255,0.5)", padding: "25px"}}>
					<h2>Home</h2>
					Bienvenue sur Upendo{ this.state.user ? ' '+this.state.user.username : '' }!
				</div>
				<br /><br />
				<h2>What is Upendo?</h2>
				<p>Upendo is a place where you can meet other people, who, like you, are in search of the One...</p>
				<h2>How does it work?</h2>
				<p>Upendo is free! You just have to register and you'll be able to enter in contact with others users of the site. If they like you too, bingo! You'll have the possibility to start a conversation and maybe more...</p>
				<h2>Why should I trust you?</h2>
				<p>Because dozens of people are now in love with each others due to Upendo! Just have a look at what they say about us:</p>
				<div className="row">
					<div className="col-md-4">
						<img src="" width="100%" height="300px"/>
						<strong>Franck</strong> Really guys, Upendo save my life! In just a few months, I met Emily who is now the mother of my two little monsters! ;-) Upendo rocks!
					</div>

					<div className="col-md-4">
						<img src="" width="100%" height="300px"/>
						<strong>Franck</strong> Really guys, Upendo save my life! In just a few months, I met Emily who is now the mother of my two little monsters! ;-) Upendo rocks!
					</div>

					<div className="col-md-4">
						<img src="" width="100%" height="300px"/>
						<strong>Franck</strong> Really guys, Upendo save my life! In just a few months, I met Emily who is now the mother of my two little monsters! ;-) Upendo rocks!
					</div>
				</div>
			</div>
		)
	}
}