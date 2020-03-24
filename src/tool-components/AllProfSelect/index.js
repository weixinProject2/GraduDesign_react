import React, { Fragment } from 'react';
import { StoreProvider } from './stores';
import ProfSelect from './ProfSelect'


export default ((props) => {
    return (
        <Fragment>
            <StoreProvider {...props}>
                <ProfSelect />
            </StoreProvider>
        </Fragment>
    );
})