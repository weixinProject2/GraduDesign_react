import React, { useEffect } from 'react';
import { LoginStore } from './stores/index';
import LoginForm from './LoginForm'

import './index.less'

export default ((props) => {
    return (
        <div className="gradu-login">
            <LoginStore>
                <LoginForm />
            </LoginStore>
        </div>
    );
})