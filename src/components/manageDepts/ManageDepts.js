import React, { Fragment, useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { MyDeptsContext } from './stores';
import { Button, message, Drawer, Modal } from 'antd';
import SearhForm from './SearchForm';
import { getAllDeptsInfo } from '../../api';
import DeptsTable from './DeptsTable';
import AddDept from './AddDept';


export default observer(() => {
    const {
        TableAttrStore: {
            getBtnDisabled, getSearchParams, setTableLoading, setBtnDisabled, setTotalPage, setTableData,
            getDeptAddModalVisble, setDeptAddModalVisble,
        }
    } = useContext(MyDeptsContext);

    useEffect(() => {

        return () => {

        };
    }, [])

    function loadDeptsInfo() {
        let searchParams = getSearchParams;
        setTableLoading(true);
        setBtnDisabled(true);
        getAllDeptsInfo(searchParams).then((res) => {
            if (!res.error && res.data) {
                setTotalPage(res.total);
                setTableLoading(false);
                setBtnDisabled(false);
                setTableData(res.data);
            } else {
                message.error('加载失败');
                setTableLoading(false);
                setBtnDisabled(false);
                setTableData([]);
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    function changeVisible() {
        setDeptAddModalVisble(true);
    }

    function closeDeptsDrawer() {
        setDeptAddModalVisble(false);
    }
    return (
        <div className="gradu-depts-manage">
            <header className="gradu-content-header">
                <Button icon="user-add" ghost type='primary' onClick={changeVisible} disabled={getBtnDisabled}>添加部门</Button>
                <Button icon="reload" ghost type='primary' onClick={loadDeptsInfo} disabled={getBtnDisabled}>刷新</Button>
            </header>
            <div className="gradu-form-content">
                <h2>部门信息列表</h2>
                <SearhForm />
                <DeptsTable />
            </div>
            <Drawer
                title="新增部门"
                placement="right"
                width={450}
                closable={true}
                onClose={closeDeptsDrawer}
                visible={getDeptAddModalVisble}
                destroyOnClose
            >
                <AddDept />
            </Drawer>
        </div>
    )
})