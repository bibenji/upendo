import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

export default class Conversations extends React.Component {
	constructor(props) {
		super(props);
	}
	
	render() {		
		return (
			<div>
				
				<div className="list-group">
					{this.props.conversations.map((conv, index) => {
						const lastMessage = conv.messages.length > 0 ? conv.messages[conv.messages.length-1] : null;
						return (						
							<Link key={index} to={`${this.props.match.url}/${conv.id}`} className="list-group-item list-group-item-action d-flex flex-row align-items-stretch justify-content-between">
								<div className="d-flex flex-row justify-content-center">								
									{conv.users.map((user, index) => {											
										if (user.id !== this.props.connectedUserId) {
											return (
												<div key={index} className="text-md-center p-1">
													<img src={user.photos[0] ? "http://localhost/mynewupendo"+user.photos[0].path : "https://unsplash.it/200/200"} className="rounded mb-1" width="50px" height="50px" /><br />
													<h5 className="">
														{user.username}												
													</h5>
												</div>
											);												
										}
									})}
								</div>
								
								{lastMessage ?
									<div className="d-flex flex-column justify-content-center text-md-right">									
										<strong>{lastMessage.from.username}</strong>
										<p>{lastMessage.content}</p>
										<small className="text-muted">{moment(lastMessage.messageDate).fromNow()}</small>
									</div>								
								: 
									<div className="d-flex flex-column justify-content-center text-md-right">
										<p className="mb-1">New conversation! Be the first to send a message...'</p>
									</div>
								}
								
								{/*<small className="text-muted">Donec id elit non mi porta.</small>*/}
								
							</Link>
						);
					})}
					
					{/*
					<Link to={`${this.props.match.url}/conversation1`} className="list-group-item list-group-item-action flex-column align-items-start active">
						<div className="d-flex w-100 justify-content-between">
							<h5 className="mb-1">List group item heading</h5>
							<small>3 days ago</small>
						</div>
						<p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
						<small>Donec id elit non mi porta.</small>
					</Link>					
					<Link to={`${this.props.match.url}/conversation2`} className="list-group-item list-group-item-action flex-column align-items-start">
						<div className="d-flex w-100 justify-content-between">
							<h5 className="mb-1">List group item heading</h5>
							<small className="text-muted">3 days ago</small>
						</div>
						<p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
						<small className="text-muted">Donec id elit non mi porta.</small>
					</Link>
					<Link to={`${this.props.match.url}/conversation3`} className="list-group-item list-group-item-action flex-column align-items-start">
						<div className="d-flex w-100 justify-content-between">
							<h5 className="mb-1">List group item heading</h5>
							<small className="text-muted">3 days ago</small>
						</div>
						<p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
						<small className="text-muted">Donec id elit non mi porta.</small>
					</Link>
					*/}
				</div>
				
			</div>
		)
	}
}