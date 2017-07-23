import React from 'react';

export default class Contacts extends React.Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		return (
			<div>
				<ul className="list-group">
					<li className="list-group-item justify-content-between">
						Cras justo odio
						<span className="badge badge-default badge-pill">14</span>
					</li>
					<li className="list-group-item justify-content-between">
						Dapibus ac facilisis in
						<span className="badge badge-default badge-pill">2</span>
					</li>
					<li className="list-group-item justify-content-between">
						Morbi leo risus
						<span className="badge badge-default badge-pill">1</span>
					</li>
				</ul>
			</div>
		)
	}
}