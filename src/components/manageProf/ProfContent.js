import React, { Fragment } from 'react'
import { observer } from 'mobx-react-lite'
import { Button, message, Drawer, Modal } from 'antd';

import { useProfStore } from './stores'
import ProfTable from './ProfTable';
import AddForm from './AddForm';
import TableHeader from '../../tool-components/TableHeader';

export default observer(() => {
    const {
        mainStore: {
            loadInfo,
            getBtnDisabled,
            getProfAddModalVisble,
            setProfAddModalVisble,
        },
    } = useProfStore();

    function refresh() {
        loadInfo();
    }

    function closeProfDrawer() {
        setProfAddModalVisble(false);
    }

    function openDrawer() {
        setProfAddModalVisble(true);
    }

    const headerBtns = (
        <Fragment>
            <Button icon="user-add" ghost type='primary' disabled={getBtnDisabled} onClick={openDrawer}>添加新职业</Button>
            <Button
                icon="reload" ghost
                type='primary'
                disabled={getBtnDisabled}
                onClick={refresh}
            >刷新</Button>
        </Fragment>
    )

    return (
        <Fragment>
            <TableHeader headerButtons={headerBtns} />
            <div className="gradu-form-content">
                <h2>职业信息列表</h2>
                <ProfTable />
            </div>
            <Drawer
                title="新增职业"
                placement="right"
                width={450}
                closable={true}
                onClose={closeProfDrawer}
                visible={getProfAddModalVisble}
                destroyOnClose
            >
                <AddForm />
            </Drawer>
        </Fragment>
    )
})