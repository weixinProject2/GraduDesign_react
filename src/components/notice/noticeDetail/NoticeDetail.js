import React, { Fragment } from 'react';
import { observer } from 'mobx-react-lite';
import TableHeader from '../../../tool-components/TableHeader';
import history from '../../../utils/history'

export default observer(() => {
    console.log(history);
    return (
        <Fragment>
            <TableHeader hasBack />
            llll
        </Fragment>
    )
})