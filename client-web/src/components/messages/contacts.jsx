import React from 'react';
import icons from 'glyphicons';

export default class Contacts extends React.Component {
	constructor(props) {
		super(props);
	}

	callGetConversationFromContact(event, i) {
		event.preventDefault();
        this.props.getConversationFromContact(i);
	}
	
	render() {
        console.info('I' + icons.arrowDoubleR + ' Glyphicons!');
		return (
			<div>
				<ul className="list-group">
					{this.props.contacts.length > 0 ?
						this.props.contacts.map((contact, i) => {
							console.log(contact);
							return (
    	                        <li key={i} className="list-group-item justify-content-between">
									<img src={contact.mainPhoto !== null ? 'http://assets.upendo.localhost'+contact.mainPhoto.path : require('../../resources/img/contact-girl-1.png')} className="contact-round-photo" />
                                    <span className="badge badge-default badge-pill">{contact.username}</span>
									<a href="#" onClick={(event) => this.callGetConversationFromContact(event, i)}>{icons.arrowDoubleR}</a>
								</li>
							);
						}) :
                        <li className="list-group-item justify-content-between">
							Pas de contacts.
                        </li>
					}
				</ul>
			</div>
		)
	}
}