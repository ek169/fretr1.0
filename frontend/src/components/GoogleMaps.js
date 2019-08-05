import React, { Component } from 'react';


export class GoogleMaps extends Component {

    render = () => {
        return (
            <iframe
                frameBorder="0"
                className="div"
                src={'https://www.google.com/maps/embed/v1/search?key=AIzaSyAIzGxh29S4MFoE4llwn5RVbXw81hpy8as&q='
                + this.props.object.params}
                 allowFullScreen>
            </iframe>
        );
    }
}
