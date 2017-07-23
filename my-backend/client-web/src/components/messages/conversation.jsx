import React from 'react';
import moment from 'moment';

import CustomAxios from '../../tools/connectivity/api';

const Styles = {
	MainContainerStyle: {
		display: "flex",
		flexDirection: "column"		
	},	
	ConversationContainerStyle: {		
		overflow: "auto",
		width: "100%",
		margin: "0px auto",
		verticalAlign: "bottom"
	},
	TextFieldStyle: {
	
	},
	FormFlexContainerStyle: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "flex-end"		
	},
	InputStyle: {
		flex: 1
	},
	UserMessage: {
		border: "1px solid rgba(171,183,183,0.75)",
		borderRadius: "5px",
		backgroundColor: "rgba(210,215,211,0.75)"				
	},
	OtherMessage: {
		border: "1px solid rgba(171,183,183,0.75)",
		borderRadius: "5px",
		backgroundColor: "rgba(144,198,149,0.75)"		
	}
}

export default class Conversation extends React.Component {
	constructor(props) {
		super(props);
		
		const baseConversationHeight = this.getConversationHeight();
		
		this.state = {			
			conversationHeight: baseConversationHeight,
			fieldValue: '',
			conversation: null,
		};
		
		this.updateConversationHeight = this.updateConversationHeight.bind(this)
	}
	
	componentWillMount() {
		// this.updateConversationHeight.bind(this);
    }
	
	componentDidMount() {				
		window.addEventListener('resize', this.updateConversationHeight);
		// this.updateConversationHeight.bind(this);
		this.getConversation();
	}
	
	componentWillUnmount() {		
        window.removeEventListener('resize', this.updateConversationHeight);
    }
	
	getConversationHeight() {
		const body = document.body;
		const html = document.documentElement;

		const height = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
				
		return (height - 150) + "px";
	}
	
	updateConversationHeight() {		
		const newHeight = this.getConversationHeight();
		this.setState({
			conversationHeight: newHeight
		});
	}
	
	getConversation() {
		const that = this;
		
		CustomAxios.get('/conversations/'+this.props.conversationId+'?apikey='+this.props.user.apikey)
		.then(function(response) {						
			if (response.status === 200) {
				that.setState({
					conversation: response.data
				});
			}
		});			
	}
	
	updateFieldValue(event) {
		this.setState({
			fieldValue: event.target.value
		});
	}
	
	sendMessage(event) {		
		event.preventDefault();
		const that = this;
		
		const newMessage = {
			content: this.state.fieldValue,
			from: '/mynewupendo/web/app_dev.php/users/'+this.props.user.id,
			conversation: this.state.conversation['@id']
		};
				
		CustomAxios.post('/messages?apikey='+this.props.user.apikey, newMessage)
		.then(function(response) {						
			if (response.status === 201) {				
				let updatedConversation = that.state.conversation;
				updatedConversation.messages.push(response.data);
				that.setState({
					conversation: updatedConversation
				}, that.props.updateConversation(updatedConversation));
			}
		});						
	}
	
	render() {
		const NotMutatedMainContainerStyle = Object.assign({}, Styles.MainContainerStyle, {height: this.state.conversationHeight});
		const conversation = this.state.conversation;
		
		return (
			<div style={NotMutatedMainContainerStyle}>
				
				<div className="row" style={Styles.ConversationContainerStyle}>
					<div className="col-md-12">
						{conversation && conversation.messages && conversation.messages.length > 0 ? 
							conversation.messages.map((message, index) => {
								if (message.from.id === this.props.user.id) {
									return (										
										<div key={index} className="row mb-2">
											<div className="col-md-9 offset-md-2 text-md-right p-2 mb-1" style={Styles.UserMessage}>
												<strong>{message.from.username}</strong><br />
												{message.content}<br />
												<small>{moment(message.messageDate).fromNow()}</small>
											</div>
										</div>
									);									
								} else {
									return (
										<div key={index} className="row mb-2">						
											<div className="col-md-9 p-2 mb-1" style={Styles.OtherMessage}>
												<strong>{message.from.username}</strong><br />
												{message.content}<br />
												<small>{moment(message.messageDate).fromNow()}</small>
											</div>
										</div>									
									);
								}
							})
						: 
							<div className="row p-2 text-md-center">
								<span>Be the first to send a new message!</span>
							</div>
						}
					</div>
				</div>
				
				<div style={Styles.TextFieldStyle}>
					<br />
					<form onSubmit={this.sendMessage.bind(this)} className="form-inline" style={Styles.FormFlexContainerStyle}>																	
						<input
							style={Styles.InputStyle}
							value={this.state.fieldValue}
							onChange={this.updateFieldValue.bind(this)}
							type="text"
							className="form-control mb-2 mr-sm-2 mb-sm-0"
							id="inlineFormInput"
							placeholder="Type your text here."
						/>						
						<button type="submit" className="btn btn-primary">Send</button>
					</form>
				</div>
				
			</div>
		)
	}
}