import React, { Component } from "react";

import { BrowserRouter as Router, Route } from "react-router-dom";
import MemoMain from "./MemoMain";

export default class RouteApp extends Component {
    render () {
        return (
            <Router>
                <Route exact path="/" component={MemoMain}/>
                <Route path="/label/:labelId" component={MemoMain}/>
            </Router>
        );
    }
}