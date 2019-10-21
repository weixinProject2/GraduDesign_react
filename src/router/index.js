import React, { Component, Fragment } from 'react'
import { HashRouter as Router, Route } from 'react-router-dom';
// import ProtectedRoute from '../components/ProtectedRoute'
import Login from '../components/login/index';
export default class index extends Component {
    render() {
        return (
            <Fragment>
                <Router>
                    <Route path="/" exact component={Login}></Route>
                    {/* <ProtectedRoute path="/user" component={SubRouter}></ProtectedRoute> */}
                </Router>
            </Fragment>
        )
    }
}
