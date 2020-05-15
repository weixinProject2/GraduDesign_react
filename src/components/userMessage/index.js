import React from 'react';
import { MessageStore } from './stores';
import Bell from './Bell';

import './index.less'

export default ((props) => {
    const userInfo = localStorage.getItem('userInfo');
    return (
        <MessageStore {...props}>
            <Bell userInfo={JSON.parse(userInfo)} />
        </MessageStore>
    );
})