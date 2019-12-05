import React from 'react';
import { StoreProvider } from './stores';
import Scrumboard from './Scrumboard'
export default ((props) => {
    return (
        <StoreProvider {...props}>
            <Scrumboard />
        </StoreProvider>
    );
})