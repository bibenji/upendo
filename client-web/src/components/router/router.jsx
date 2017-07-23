import React from 'react';
import Reflux from 'reflux';
import Store from '../../tools/store/store';
import { UserActions } from '../../tools/store/actions';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import CustomAxios from '../../tools/connectivity/api';

import Homepage from '../homepage/homepage';
import Login from '../login/login';
import Affinities from '../affinities/affinities';
import MyProfile from '../my-profile/myProfile';
import Register from '../register/register';
import Settings from '../settings/settings';
import ProfilesContainer from '../profiles/profilesContainer';
import Mailbox from '../messages/mailbox';

const About = () => (
  <div>
    <h2>About</h2>	
  </div>
)

const Topic = ({ match }) => (
  <div>
	<h1>Ccoucou!</h1>
    <h3>{match.params.topicId}</h3>
  </div>
)

const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>
          Rendering with React
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>
          Components
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>
          Props v. State
        </Link>		
      </li>
    </ul>
	
	<Route path={`${match.url}/:topicId`} component={Topic}/>
    <Route exact path={match.url} render={() => {    
		return (
			<h3>Please select a topic.</h3>
		);
	}}/>
  </div>
)


// just in case of troubles for the next two const : https://github.com/ReactTraining/react-router/issues/4105

const ComponentWithMergedProps = (props) => {
	return (
		React.createElement(props.component, props.componentProps)
	);	
}

const PropsRoute = (props) => {	
	let component = props.component;			
		
	return (
		<Route exact={props.exactPath} path={props.path} render={routeProps => {
			let newProps = Object.assign({}, routeProps, props);
			delete newProps.component;
			delete newProps.path;
			delete newProps.exactPath;
			
			// return ComponentWithMergedProps(props, routeProps, ...rest);
			return ComponentWithMergedProps({
				component: component,
				componentProps: newProps
			});
		}} />
	);	
}

// const MainRouter = () => (
class MainRouter extends Reflux.Component {
	constructor(props) {
		super(props);
		this.store = Store;		
	}
	
	logout() {
		UserActions.logoutUser();		
	}
	
	getCustomAxiosParams() {		
		return {apikey: this.state.user.apikey};
	}
	
	render() {
		const isUserConnected = (this.state.user.username != '');
		
		return (
			<Router>
				<div>
					<nav className="navbar navbar-toggleable-md navbar-light bg-faded">
						<div className="container">
							<button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
								<span className="navbar-toggler-icon"></span>
							</button>
							<Link className="navbar-brand" to="/">Upendo</Link>
							
							<div className="collapse navbar-collapse" id="navbarSupportedContent">
								<ul className="navbar-nav mr-auto">
									<li className="nav-item active">
										<Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
									</li>
									<li className="nav-item">
										<Link className={isUserConnected ? "nav-link" : "nav-link disabled"} to="/profiles">Profiles</Link>
									</li>
									<li className="nav-item">
										<Link className={isUserConnected ? "nav-link" : "nav-link disabled"} to="/affinities">Affinities</Link>
									</li>
									<li className="nav-item">
										<Link className="nav-link disabled" to="/events">Events</Link>
									</li>
									<li className="nav-item">
										<Link className={isUserConnected ? "nav-link" : "nav-link disabled"} to="/messages">Messages</Link>
									</li>									
									<li className="nav-item">
										<Link className={isUserConnected ? "nav-link" : "nav-link disabled"} to="/my-profile">My Profile</Link>
									</li>
									<li className="nav-item">
										<Link className={isUserConnected ? "nav-link" : "nav-link disabled"} to="/settings">Settings</Link>
									</li>
									<li className="nav-item">
										<Link className="nav-link" to="/topics">Topics</Link>
									</li>
									<li className="nav-item">
										<Link className="nav-link" to="/about">About</Link>
									</li>
								</ul>
							
								<form className="form-inline my-2 my-lg-0">
									{/*<input className="form-control mr-sm-2" type="text" placeholder="Search" />*/}
									{!isUserConnected ?
									<div>
										<Link className="btn btn-outline-primary my-2 my-sm-0" to="/login">Login</Link>
										&nbsp;
										<Link className="btn btn-outline-primary my-2 my-sm-0" to="/register">Register</Link>
									</div>
									:
									<button className="btn btn-outline-warning my-2 my-sm-0" onClick={this.logout}>Logout</button>
									}
								</form>
							</div>
						</div>
					</nav>
					
					<div className="container">
						<br />
						{/*<Route exact path="/" component={Homepage} />*/}					
						<PropsRoute path='/' component={Homepage} axiosParams={this.getCustomAxiosParams()} exactPath={true} />
						<Route exact path="/login" component={Login}/>
						<Route exact path="/affinities" component={Affinities}/>
						<Route path="/my-profile" component={MyProfile}/>
						<Route exact path="/register" component={Register}/>
						<Route path="/messages" component={Mailbox}/>
						{/*<Route exact path="/profiles" component={Profiles}/>*/}
						<PropsRoute path='/profiles' component={ProfilesContainer} axiosParams={this.getCustomAxiosParams()} />
						<Route exact path="/about" component={About}/>
						<Route exact path="/settings" component={Settings}/>
						<Route path="/topics" component={Topics}/>											
					</div>
				</div>
			</Router>
		)
	}
}

export default MainRouter