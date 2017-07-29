import React from 'react';
import { Link } from 'react-router-dom';

export default class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <Link to="/profiles" className="btn float-right">Back</Link>
                    <h2>Search</h2>
                    <p>Powerfull functions to find profiles!</p>

                    <hr />
                    <form>
                        <div className="row">
                            <div className="col-md-8">
                                <input type="text" className="form-control" placeholder="Type here any word you want to search..."/>
                            </div>
                            <div className="col-md-4">
                                <input type="submit" value="Search"/>
                            </div>
                        </div>
                    </form>


                    <hr />
                    <h4>Results</h4>
                    <p>0 result to display.</p>

                </div>
            </div>
        )
    }
}