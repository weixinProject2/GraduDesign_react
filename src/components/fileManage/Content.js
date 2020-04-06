import React, { Fragment } from 'react';
import { observer } from 'mobx-react-lite';
import { Button } from 'antd';
import TableContainer from '../../tool-components/TableContainerStyle';
import SideTree from './components/sideTree';

export default observer(() => {

    function openUploadModal() {

    }

    const btnGroup = (
        <Fragment>
            <Button
                icon="file-add"
                ghost
                type='primary'
                onClick={openUploadModal}
            >新增文件</Button>
            <Button
                type="primary"
                icon="reload"
                ghost
            >刷新</Button>
        </Fragment>
    );

    const sideTree = (<SideTree />)

    return (
        <Fragment>
            <TableContainer headerButtons={btnGroup} title="文件管理" hasSideTree={sideTree}>
                <p>hello</p>
            </TableContainer>
        </Fragment>
    )
})