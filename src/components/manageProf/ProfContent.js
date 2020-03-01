import React, { Fragment } from 'react'
import { observer } from 'mobx-react-lite'
import { Button, message, Drawer, Modal } from 'antd';

import { useProfStore } from './stores'
import ProfTable from './ProfTable';
// import PosTable from './PosTable';

export default observer(() => {
    const {
        mainStore: { loadInfo, getBtnDisabled },
    } = useProfStore();

    function refresh() {
        loadInfo();
    }

    return (
        <Fragment>
            <header className="gradu-content-header">
                <Button icon="user-add" ghost type='primary' disabled={getBtnDisabled} >添加新职业</Button>
                <Button
                    icon="reload" ghost
                    type='primary'
                    disabled={getBtnDisabled}
                    onClick={refresh}
                >刷新</Button>
            </header>
            <div className="gradu-form-content">
                <h2>职业信息列表</h2>
                <ProfTable />
            </div>
        </Fragment>
    )
})