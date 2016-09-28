import React from 'react';

import './app.less';
import 'font-awesome/css/font-awesome.min.css';
import imgSrc from "./carbon.png";

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div id="wrap">
                <h1><i className="fa fa-camera-retro"></i> Hello World</h1>
                <img src={imgSrc} />
            </div>
        );
    }
}
