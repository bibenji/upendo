import React from 'react';
import Reflux from 'reflux';
import Store from '../../tools/store/store';

import { Link, Route } from 'react-router-dom';

import CustomAxios from '../../tools/connectivity/api';

import Contacts from './contacts';
import ConversationsList from './conversationsList';
import Conversation from './conversation';

export default class Mailbox extends Reflux.Component {
	constructor(props) {
		super(props);
		this.state = {
			conversations: []		
		};
		this.store = Store;
	}
	
	componentDidMount() {
		this.getConversations();
	}
	
	getConversations() {	
		const that = this;		
		
		CustomAxios.get('/conversations?apikey='+this.state.user.apikey)
		.then(function(response) {			
			if (response.status === 200) {
				that.setState({
					conversations: response.data['hydra:member']
				});
			}
		});	
	}
	
	updateConversation(conversation) {				
		let updatedConversations = this.state.conversations;
		
		const index = updatedConversations.findIndex((conv) => {
			return conv.id === conversation.id;
		});			
		
		updatedConversations[index] = conversation;
		
		this.setState({
			conversations: updatedConversations
		});		
	}
	
	render() {		
		return (
			<div>
				{!this.props.match.isExact ?
					<Link to="/messages" className="float-right">Back</Link>
				: null}
				<h2>MailBox</h2>
				<Route path={`${this.props.match.url}/:conversationId`} render={(props) => {    															
					return (						
						<Conversation
							user={this.state.user}
							conversationId={props.match.params.conversationId}
							updateConversation={this.updateConversation.bind(this)}
						/>						
					);
				}}/>
				<Route exact path={this.props.match.url} render={() => {    
					return (
						<div className="row">
							<div className="col-md-12">
								<h4>Conversations</h4>
								<ConversationsList
									match={this.props.match}
									conversations={this.state.conversations}
									connectedUserId={this.state.user.id}
								/>
							</div>
							{/*
							<div className="col-md-4">
								<h4>Contacts</h4>
								<Contacts/>
							</div>
							 */}
						</div>						
					);
				}}/>
			</div>
		)
	}
}