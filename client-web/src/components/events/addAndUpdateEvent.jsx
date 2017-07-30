import React from 'react';

export default class AddAndUpdateEvent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newEvent: {
                eventName: '',
                eventPlace: '',
                eventDate: '',
                eventDescription: '',
                maxParticipants: 0
            }
        };
    }

    componentDidMount() {
        if (this.props.eventToUpdate) {
            this.setState({
               newEvent: this.props.eventToUpdate
            });
        }
    }

    updateField(event) {
        let updatedNewEvent = this.state.newEvent;
        if (event.target.name === 'maxParticipants') {
            updatedNewEvent['maxParticipants'] = parseInt(event.target.value);
        } else {
            updatedNewEvent[event.target.name] = event.target.value;
        }
        this.setState({
            newEvent: updatedNewEvent
        });
    }

    render() {
        return (
            <div className="card">
                <div className="card-block">
                    <h3 className="mb-3">Add Or Update An Event</h3>

                    <form onSubmit={(event) => this.props.addOrUpdateEvent(event, this.state.newEvent)}>
                        <div className="form-group">
                            <label htmlFor="eventName">Event's name</label>
                            <input type="text" className="form-control" name="eventName" id="eventName" onChange={this.updateField.bind(this)} value={this.state.newEvent.eventName} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="eventPlace">Event's place</label>
                            <input type="text" className="form-control" name="eventPlace" id="eventPlace" onChange={this.updateField.bind(this)} value={this.state.newEvent.eventPlace} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="eventDate">Event's date (+ hour)</label>
                            <input type="text" className="form-control" name="eventDate" id="eventDate" onChange={this.updateField.bind(this)} value={this.state.newEvent.eventDate} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="eventDescription">Event's description</label>
                            <textarea className="form-control" name="eventDescription" id="eventDescription" onChange={this.updateField.bind(this)} value={this.state.newEvent.eventDescription} rows="3"></textarea>
                        </div>

                        <div className="form-group">
                            <label htmlFor="maxParticipants">Event's max participants</label>
                            <input type="number" className="form-control" name="maxParticipants" id="maxParticipants" onChange={this.updateField.bind(this)} value={this.state.newEvent.maxParticipants} />
                        </div>

                        <input type="submit" className="btn btn-primary float-right" value="Submit" />

                    </form>

                </div>
            </div>
        )
    }
}