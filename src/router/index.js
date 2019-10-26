import React, { useContext, Fragment, useEffect } from 'react'
import { HashRouter as Router, Route } from 'react-router-dom';
import ProtectedRoute from '../utils/ProtectedRoute'
import SubRouter from './router'
import Login from '../components/login/index';
export default (() => {
    return (
        <Fragment>
            <Router>
                {/* <Route exact path="/" component={SubRouter} /> */}
                <Route path="/login" component={Login}></Route>
                <ProtectedRoute  path="/main" Component={SubRouter}></ProtectedRoute>
            </Router>
        </Fragment>
    )

})
