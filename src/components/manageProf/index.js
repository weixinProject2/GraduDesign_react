import React from 'react';
import { StoreProvider } from './stores';
import ProfContent from './ProfContent'
import './index.less';

export default ((props) => {
    return (
        <StoreProvider {...props}>
            <ProfContent />
        </StoreProvider>
    )
})