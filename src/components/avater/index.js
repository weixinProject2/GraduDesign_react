import React, { useEffect, Fragment } from 'react';
import { AvaterStore } from './stores/index';
import Avater from './Avater'

import './index.less'

export default (() => {

    useEffect(() => {
    }, []);

    return (
        <Fragment>
            <AvaterStore>
                <Avater />
            </AvaterStore>
        </Fragment>
    );
})