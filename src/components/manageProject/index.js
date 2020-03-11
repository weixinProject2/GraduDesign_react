import React from 'react';
import { StoreProvider } from './stores';

import ManageProject from './ManageProject';
import "./index.less";

export default ((props) => {
    return (
        <StoreProvider {...props}>
            <ManageProject />
        </StoreProvider>
    )
})