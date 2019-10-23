import React, { useEffect, Fragment } from 'react';
import { AvaterStore } from './stores/index';
import Avater from './Avater'

import './index.less'

export default ((props) => {
    const userInfo = localStorage.getItem('userInfo');
    useEffect(() => {
    }, []);
    return (
        <Fragment>
            <AvaterStore>
                <Avater userInfo={JSON.parse(userInfo)} />
            </AvaterStore>
        </Fragment>
    );
})