import React, { Fragment, useEffect, useState } from 'react'
import { Button, Drawer } from 'antd'



export default (({ userInfo }) => {
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
                title="消息列表"
                placement="right"
                closable={true}
                mask={false}
                width={500}
                onClose={onClose}
                visible={visible}
            >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Drawer>
        </Fragment>

    )
})

