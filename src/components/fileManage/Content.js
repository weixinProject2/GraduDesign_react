import React, { Fragment } from 'react';
import { observer } from 'mobx-react-lite';
import { Button } from 'antd';
import TableHeader from '../../tool-components/TableHeader';
import ContentTitle from '../../tool-components/ContentTitle';
import PageContent from '../../tool-components/PageContent';
import TableContainer from '../../tool-components/TableContainerStyle';

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
    
    return (
        <Fragment>
            <TableContainer headerButtons={btnGroup} title="文件管理">
                <p>hello</p>
            </TableContainer>
        </Fragment>
    )
})