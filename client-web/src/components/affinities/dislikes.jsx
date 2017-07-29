import React from 'react';
import { Link } from 'react-router-dom';

export default class Dislikes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <Link to="/affinities" className="btn float-right">Back</Link>
                    <h2>Dislikes</h2>

                    <hr />
                    <h4>They disliked you</h4>

                    <hr />
                    <h4>You disliked them</h4>

                </div>
            </div>
        )
    }
}