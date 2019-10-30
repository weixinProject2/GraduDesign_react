import React, { useContext, Fragment, useEffect } from 'react'
import { HashRouter as Router, Route } from 'react-router-dom';
import ProtectedRoute from '../utils/ProtectedRoute'
import SubRouter from './router'
import Login from '../components/login/index';
import history from '../utils/history'
export default (() => {
    return (
        <Fragment>
            <Router>
                <Route exact path="/" render={()=>history.push('/main')} />
                <Route path="/login" component={Login}></Route>
                <ProtectedRoute  path="/main" Component={SubRouter}></ProtectedRoute>
            </Router>
        </Fragment>
    )

})
