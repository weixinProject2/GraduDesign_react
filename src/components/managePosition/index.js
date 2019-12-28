import React from 'react';
import { StoreProvider } from './stores';
import MangePosition from './MangePosition'

import './index.less';

export default ((props) => {
    return (
        <StoreProvider {...props}>
            <MangePosition />
        </StoreProvider>
    )
})