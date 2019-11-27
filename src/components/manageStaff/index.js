import React, { useEffect, Fragment } from 'react';
import { StaffStore } from './stores/index';
import ManageStaff from './ManageStaff'

import './index.less'

export default ((props) => {
    return (
        <Fragment>
            <StaffStore {...props}>
                <ManageStaff />
            </StaffStore>
        </Fragment>
    );
})