import React from 'react';
import Reflux from 'reflux';
import Store from '../../tools/store/store';
import { Link } from 'react-router-dom';

import CustomAxios from '../../tools/connectivity/api';

export default class Dislikes extends Reflux.Component {
    constructor(props) {
        super(props);
        this.state = {
            dislikedRelations: []
        };
        this.store = Store;
    }

    componentDidMount() {
        this.getDislikedRelations();
    }

    getDislikedRelations() {
        const that = this;

        CustomAxios.get('/relations', {params: {
            'apikey': this.state.user.apikey,
            'relations_filter_by': 'disliked'
        }})
            .then(function(response) {
                if (response.status === 200) {
                    // console.log(response.data);
                    that.setState({
                        dislikedRelations: response.data['hydra:member']
                    })
                }
            });
    }

    render() {
        this.state.dislikedRelations.forEach((relation, index) => {
            if(relation.status === "3") {
                console.log()
                console.log('une relation avec status 3 !!!');
            }
        });

        return (
            <div className="row">
                <div className="col-md-12">
                    <Link to="/affinities" className="btn float-right">Back</Link>
                    <h2>Dislikes</h2>

                    <hr />
                    <h4>They disliked you</h4>
                    <div className="row">
                        {this.state.dislikedRelations.map((relation, index) => {
                           if(relation.status === "3" && relation.lastActionUserId !== this.state.user.id) {
                               let userToDisplay = null;
                               if(relation.userOne.id === this.state.user.id) {
                                   userToDisplay = relation.userTwo;
                               }
                               else if(relation.userTwo.id === this.state.user.id) {
                                   userToDisplay = relation.userOne;
                               }

                               if (null !== userToDisplay) {
                                   return (
                                       <div className="col-md-3" key={index}>
                                           <img src={userToDisplay.mainPhoto ? "http://assets.upendo.localhost"+userToDisplay.mainPhoto : require('../../resources/img/girl-2.jpg')} className="img-thumbnail image-fit" />
                                           <div className="text-center">{userToDisplay.username}</div>
                                       </div>
                                   );
                               }
                           }
                        })}
                    </div>

                    <hr />
                    <h4>You disliked them</h4>
                    <div className="row">
                        {this.state.dislikedRelations.map((relation, index) => {
                            if(relation.status === "3" && relation.lastActionUserId === this.state.user.id) {
                                let userToDisplay = null;
                                if(relation.userOne.id === this.state.user.id) {
                                    userToDisplay = relation.userTwo;
                                }
                                else if(relation.userTwo.id === this.state.user.id) {
                                    userToDisplay = relation.userOne;
                                }

                                if (null !== userToDisplay) {
                                    return (
                                        <div className="col-md-3" key={index}>
                                            <img src={userToDisplay.mainPhoto ? "http://assets.upendo.localhost"+userToDisplay.mainPhoto : require('../../resources/img/girl-2.jpg')} className="img-thumbnail image-fit" />
                                            <div className="text-center">{userToDisplay.username}</div>
                                        </div>
                                    );
                                }
                            }
                        })}
                    </div>

                </div>
            </div>
        )
    }
}