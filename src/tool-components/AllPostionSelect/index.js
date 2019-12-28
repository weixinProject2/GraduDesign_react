import React, { Fragment } from 'react';
import { StoreProvider } from './stores';
import PosSelect from './PosSelect'


export default ((props) => {
    return (
        <Fragment>
            <StoreProvider {...props}>
                <PosSelect />
            </StoreProvider>
        </Fragment>
    );
})