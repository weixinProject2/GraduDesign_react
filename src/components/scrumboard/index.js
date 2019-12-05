import React from 'react';
import { StoreProvider } from './stores';
import Scrumboard from './Scrumboard';

import './index.less';

export default ((props) => {
    return (
        <StoreProvider {...props}>
            <Scrumboard />
        </StoreProvider>
    );
})