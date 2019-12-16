import React from 'react';
import { StoreProvider } from './stores';
import MangeDeptsStaff from './MangeDeptsStaff'
import './index.less';

export default ((props) => {
    return (
        <StoreProvider {...props}>
            <MangeDeptsStaff />
        </StoreProvider>
    )
})