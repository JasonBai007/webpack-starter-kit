import React from 'react';

import './app.less';
import 'font-awesome/css/font-awesome.min.css';

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <h1><i className="fa fa-camera-retro"></i> Hello World</h1>
        );
    }
}
