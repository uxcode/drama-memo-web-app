import React, { Component } from "react";

import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import MemoMain from "./MemoMain";

export default class RouteApp extends Component {
    render () {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={MemoMain}/>
                    <Route exact path="/label/:labelId" component={MemoMain}/>
                    <Route exact path="/label/:labelId/memo/:memoId" component={MemoMain}/>
                    <Route render={()=><div className='container-flud text-center'><h3>404</h3></div>} />
                </Switch>
            </Router>
        );
    }
}