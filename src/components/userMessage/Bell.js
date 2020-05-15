import React, { Fragment, useEffect, useState } from 'react'
import { Button, Drawer, Table } from 'antd'
import AnnounceTable from './AnnounceTable';
import { observer } from 'mobx-react-lite';

export default observer(({ userInfo }) => {
    const [visible, changeVisible] = useState(false);

    useEffect(() => {


    }, [])

    function onClose() {
        changeVisible(false);
    }

    function openDrawer() {
        changeVisible(true);
    }
    return (
        <Fragment>
            <Button
                icon="bell"
                type="primary"
                shape="circle"
                onClick={openDrawer}
            />

            <Drawer
                title="公告列表"
                placement="right"
                closable={true}
                mask={false}
                width={800}
                onClose={onClose}
                visible={visible}
            >
                <AnnounceTable />
            </Drawer>
        </Fragment>

    )
})

