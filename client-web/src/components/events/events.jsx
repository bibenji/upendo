import React from 'react';

export default class Events extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <h2>Events</h2>
                    <div className="card">
                        <div className="card-block">
                            No events for yet.
                            <br /><br />
                            Please, come back later.
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}