import React, { Fragment, useState, useEffect, useContext } from 'react';
import { observer } from 'mobx-react-lite'
import { Form } from 'antd';

const ModifyForm = observer(({ form }) => {
    return (
        <Fragment>

        </Fragment>
    )
})

const ModifyFormWrapper = Form.create()(ModifyForm);
export default ModifyFormWrapper;