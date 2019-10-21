import React, { Fragment, useContext } from 'react';
import { MyContext } from '../../stores/index';
export default (() => {
    const store = useContext(MyContext);
    return (
        <Fragment>
            this is login form
        </Fragment>
    )
})