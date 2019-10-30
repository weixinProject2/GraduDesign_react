import React, { useEffect, Fragment } from 'react';
import { MessageStore } from './stores/index';
import Bell from './Bell'

import './index.less'

export default ((props) => {
    const userInfo = localStorage.getItem('userInfo');
    useEffect(() => {
    }, []);
    return (
        <Fragment>
            <MessageStore>
                <Bell userInfo={JSON.parse(userInfo)} />
            </MessageStore>
        </Fragment>
    );
})