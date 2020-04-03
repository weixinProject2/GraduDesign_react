import React, { Fragment } from 'react'
import { observer } from 'mobx-react-lite'
import { Button, message, Drawer, Modal } from 'antd';

import { usePositionsStore } from './stores'
import PosTable from './PosTable';
import AddForm from './AddForm';
import TableContainer from '../../tool-components/TableContainerStyle';

export default observer(() => {
    const {
        mainStore: {
            loadInfo,
            getBtnDisabled,
            setPosAddModalVisble,
            getPosAddModalVisble
        },
    } = usePositionsStore();

    function refresh() {
        loadInfo();
    }

    function closePosDrawer() {
        setPosAddModalVisble(false);
    }

    function openDrawer() {
        setPosAddModalVisble(true);
    };

    const headerBtns = (
        <Fragment>
            <Button
                icon="user-add" ghost
                type='primary'
                disabled={getBtnDisabled}
                onClick={openDrawer}
            >添加新职位</Button>
            <Button
                icon="reload" ghost
                type='primary'
                disabled={getBtnDisabled}
                onClick={refresh}
            >刷新</Button>
        </Fragment>
    )

    return (
        <TableContainer headerButtons={headerBtns} title='职位信息列表'>
            <PosTable />
            <Drawer
                title="新增职位"
                placement="right"
                width={450}
                closable={true}
                onClose={closePosDrawer}
                visible={getPosAddModalVisble}
                destroyOnClose
            >
                <AddForm />
            </Drawer>
        </TableContainer>
    )
})