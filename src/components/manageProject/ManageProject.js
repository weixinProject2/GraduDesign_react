import React, { useEffect, Fragment } from 'react';
import { observer } from 'mobx-react-lite';
import { useProjectStore } from './stores';
import { withRouter } from 'react-router-dom';
import { Button } from 'antd';
import ProjectTable from './ProjectTable';

export default withRouter(observer((props) => {
    const { location } = props;
    const {
        mainStore: {
            getBtnDisabled,
            loadInfo,
        }
    } = useProjectStore();

    function openDrawer() {

    }

    function refresh() {
        loadInfo();
    }

    return (
        <Fragment>
            <header className="gradu-content-header">
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
                {/* {location.search} */}
            </header>
            <div className="gradu-form-content">
                <h2>项目信息列表</h2>
                <ProjectTable />
            </div>
        </Fragment>
    )
}))