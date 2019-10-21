import React, { Component, Fragment, useContext, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import ProtectedRoute from '../components/ProtectedRoute'
// import Login from '../pages/Login';
import { MyContext } from '../stores/index'
import { observer, Observer } from 'mobx-react-lite';
export default observer(() => {
    const store = useContext(MyContext);
    useEffect(() => {
        // console.log(count);
    }, [])
    return (
        <Fragment>
            <header>

            </header>
            <main>
                <div>

                </div>
                <div>
                    
                </div>
            </main>
        </Fragment>
    )
})