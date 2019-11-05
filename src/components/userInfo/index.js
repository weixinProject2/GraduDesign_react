import React, { useEffect, Fragment } from 'react';
import { UserInfoFormStore } from './store';
import UserInfoForm from './UserInfoForm'
import { withRouter } from 'react-router-dom'

import './index.less'

export default ((props) => {
    return (
        <Fragment>
            <UserInfoFormStore>
                <UserInfoForm />
            </UserInfoFormStore>
        </Fragment>
    );
})