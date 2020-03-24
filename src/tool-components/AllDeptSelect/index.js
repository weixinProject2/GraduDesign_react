import React, { Fragment } from 'react';
import { StoreProvider } from './stores';
import DeptsSelect from './DeptsSelect'


export default ((props) => {
    return (
        <Fragment>
            <StoreProvider {...props}>
                <DeptsSelect />
            </StoreProvider>
        </Fragment>
    );
})