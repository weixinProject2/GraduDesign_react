import React, { useContext, Fragment, useEffect } from 'react'
import { HashRouter as Router, Route } from 'react-router-dom';
// import ProtectedRoute from '../components/ProtectedRoute'
import SubRouter from './router'
import Login from '../components/login/index';
export default (() => {
    return (
        <Fragment>
            <Router>
                <Route path="/login" exact component={Login}></Route>
                {/* <ProtectedRoute path="/user" component={SubRouter}></ProtectedRoute> */}
                <Route path='/' exact component={SubRouter}></Route>
            </Router>
        </Fragment>
    )

})
