import React, { useContext, Fragment, useEffect } from 'react'
import { HashRouter as Router, Route } from 'react-router-dom';
import SubRouter from './router'
import Login from '../components/login/index';
export default (() => {
    return (
        <Fragment>
            <Router>
                <Route exact path="/" component={SubRouter} />
                <Route path="/login" component={Login}></Route>
                {/* <ProtectedRoute path="/manageMent" Component={SubRouter}></ProtectedRoute> */}
            </Router>
        </Fragment>
    )

})
