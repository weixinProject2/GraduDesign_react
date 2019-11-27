import React, { useEffect, Fragment } from 'react';
import { DeptsStore } from './stores';
import ManageDepts from './ManageDepts'

import './index.less'

export default ((props) => {
    return (
        <Fragment>
            <DeptsStore {...props}>
                <ManageDepts />
            </DeptsStore>
        </Fragment>
    );
})