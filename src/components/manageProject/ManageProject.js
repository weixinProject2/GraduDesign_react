import React, { useEffect, Fragment } from 'react';
import { observer } from 'mobx-react-lite';
import { useProjectStore } from './stores';
import { withRouter } from 'react-router-dom';
import { Button, Drawer } from 'antd';
import ProjectTable from './ProjectTable';
import SearchForm from './ProjectSearchForm';
import AddForm from './AddForm';
import TableHeader from '../../tool-components/TableHeader';


export default withRouter(observer(() => {
    const {
        mainStore: {
            getBtnDisabled,
            loadInfo,
            getAddModalVisble,
            setAddModalVisble,
        }
    } = useProjectStore();

    function openDrawer() {
        setAddModalVisble(true);
    }

    function closeAddDrawer() {
        setAddModalVisble(false);
    }

    function refresh() {
        loadInfo();
    }

    const headerBtns = (
        <Fragment>
            <Button
                icon="user-add"
                ghost
                type='primary'
                disabled={getBtnDisabled}
                onClick={openDrawer}
            >
                添加新项目
                    </Button>
            <Button
                icon="reload" ghost
                type='primary'
                disabled={getBtnDisabled}
                onClick={refresh}
            >
                刷新
                </Button>
        </Fragment>
    )

    return (
        <Fragment>
            <TableHeader headerButtons={headerBtns} />
            <div className="gradu-form-content">
                <h2>项目信息列表</h2>
                <SearchForm />
                <ProjectTable />
            </div>
            <Drawer
                title="新增项目"
                placement="right"
                width={450}
                closable={true}
                onClose={closeAddDrawer}
                visible={getAddModalVisble}
                destroyOnClose
            >
                <AddForm />
            </Drawer>
        </Fragment>
    )
}))