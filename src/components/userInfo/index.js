import React, { useEffect, Fragment } from 'react';
import { UserInfoFormStore } from './store/index';
import UserInfoForm from './UserInfoForm'
import { withRouter } from 'react-router-dom'

import './index.less'

export default ((props) => {
    const userInfo = localStorage.getItem('userInfo');
    return (
        <Fragment>
            <UserInfoFormStore>
                <UserInfoForm userInfo={JSON.parse(userInfo)} />
            </UserInfoFormStore>
        </Fragment>
    );
})