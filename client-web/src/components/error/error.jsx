import React from 'react';

export default class Error extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <div>
                <h2>Erreur</h2>

                <p>Essayez de vous reconnecter...</p>
            </div>
        )
    }
}