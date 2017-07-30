import React from 'react';
import Reflux from 'reflux';
import Store from '../../tools/store/store';

import CustomAxios from '../../tools/connectivity/api';

import AddAndUpdateEvent from './addAndUpdateEvent';

export default class Events extends Reflux.Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [],
            addMode: false,
            eventToUpdate: null,
            eventToUpdateIndex: null
        };
        this.store = Store;
    }

    componentDidMount() {
        const that = this;

        CustomAxios.get('/events?apikey='+this.state.user.apikey)
            .then(function(response) {
                if (response.status === 200) {
                    that.setState({
                        events: response.data['hydra:member']
                    });
                }
            });
    }

    toggleAddMode() {
        this.setState({
            addMode: !this.state.addMode
        });
    }

    addOrUpdateEvent(event, newEvent = null) {
        event.preventDefault();
        const that = this;

        if (!this.state.eventToUpdate && newEvent) {
            CustomAxios.post('/events?apikey='+this.state.user.apikey, newEvent)
            .then(function(response) {
                if (response.status === 201) {
                    let updatedEventsList = that.state.events;
                    updatedEventsList.push(response.data);
                    that.setState({
                        events: updatedEventsList,
                        addMode: false
                    });
                }
            });
        } else {
            delete newEvent.participants;
            CustomAxios.put('/events/'+newEvent.id+'?apikey='+this.state.user.apikey, newEvent)
            .then(function(response) {
                if (response.status === 200) {
                    let updatedEventsList = that.state.events;
                    updatedEventsList[that.state.eventToUpdateIndex] = response.data;
                    that.setState({
                        events: updatedEventsList,
                        addMode: false,
                        eventToUpdate: null,
                        eventToUpdateIndex: null
                    });
                }
            });
        }
    }

    addParticipantToEvent(index) {
        const that = this;
        const event = this.state.events[index];
        const newParticipant = '/users/'+this.state.user.id;
        event.participants.push(newParticipant);

        CustomAxios.put('/events/'+event.id+'?apiKey='+this.state.user.apikey, event)
        .then(function(response) {
            if (response.status === 200) {
                let updatedEventsList = that.state.events;
                updatedEventsList[index] = response.data;
                that.setState({
                    events: updatedEventsList
                });
            }
        });
    }

    deleteEvent(index) {
        const that = this;
        const eventId = this.state.events[index].id;

        CustomAxios.delete('/events/'+eventId+'?apiKey='+this.state.user.apikey)
        .then(function(response) {
            if (response.status === 204) {
                let updatedEventsList = that.state.events.slice(0, index).concat(that.state.events.slice(index+1, that.state.events.length));
                that.setState({
                    events: updatedEventsList
                });
            }
        });
    }

    updateEvent(index) {
        this.setState({
            eventToUpdate: this.state.events[index],
            eventToUpdateIndex: index,
            addMode: true
        });
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <button className="btn float-right" onClick={this.toggleAddMode.bind(this)}>{!this.state.addMode ? 'Add A New Event' : 'Back'}</button>
                    <h2>Events</h2>
                    {this.state.addMode ?
                        <AddAndUpdateEvent
                            addOrUpdateEvent={this.addOrUpdateEvent.bind(this)}
                            eventToUpdate={this.state.eventToUpdate}
                        />
                        :
                        this.state.events.length < 1 ?
                            <div className="card">
                                <div className="card-block">
                                    No events for yet.
                                    <br /><br />
                                    Please, come back later.
                                </div>
                            </div>
                            :

                                    this.state.events.map((event, index) => {
                                        return (
                                            <div key={index} className="card mb-4">
                                                <div className="card-block">
                                                    <div className="float-right">
                                                        <button onClick={() => this.updateEvent(index)} className="btn btn-sm btn-warning">E</button>
                                                        &nbsp;
                                                        <button onClick={() => this.deleteEvent(index)} className="btn btn-sm btn-danger">X</button>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-4">{event.eventDate}</div>
                                                        <div className="col-md-4">{event.eventName}</div>
                                                        <div className="col-md-4">{event.eventPlace}</div>
                                                    </div>
                                                    <hr />
                                                    <div className="row">
                                                        <div className="col-md-8">{event.eventDescription}</div>
                                                        <div className="col-md-4 text-md-right">
                                                            <h4><span className="badge badge-info">{event.participants.length} participant(s) / {event.maxParticipants}</span></h4>
                                                            <button onClick={() => this.addParticipantToEvent(index)} className="btn btn-primary">Inscription</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })

                    }
                </div>
            </div>
        )
    }
}