import React, { Fragment, useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, message } from 'antd';

import { getProfessional, getPosition, deleteDeptStaff } from '../../api';

import { useDeptsStaffStore } from './stores'
import DeptStaffTable from './DeptStaffTable';
import SearchForm from './SearchForm';

export default observer(() => {
    const {
        mainStore,
        searchStore,
        departmentName,
    } = useDeptsStaffStore();

    const { loadInfo, getSelectRows, getBtnDisabled, setSelectRows } = mainStore;

    const { setPf, setPosition } = searchStore;

    function loadAllOpts() {
        Promise.all([getProfessional(), getPosition()]).then((res) => {
            if (res.length > 0) {
                setPf(res[0].data);
                setPosition(res[1].data);
            } else {
                message.error('拉取数据失败！')
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    // 移除部门员工
    function removeStaff() {
        deleteDeptStaff({ 'ids': JSON.stringify(getSelectRows) }).then((res) => {
            if (!res.error) {
                loadInfo();
                message.success(res.message);
                setSelectRows([]);
            } else {
                message.error(res.message);
            }
        })
    }

    useEffect(() => {
        loadAllOpts();
    }, [])

    return (
        <Fragment>
            <header className="gradu-content-header">
                <Button
                    type="primary"
                    ghost
                    icon="user-add"
                    disabled={getBtnDisabled}
                >添加员工到此部门</Button>
                <Button
                    icon="usergroup-delete"
                    ghost type='danger'
                    disabled={!getSelectRows.length > 0}
                    onClick={removeStaff}
                >移除员工</Button>
                <Button type="primary" icon="reload" ghost onClick={loadInfo} disabled={getBtnDisabled}>刷新</Button>
            </header>
            <div className="gradu-form-content">
                {
                    departmentName && <h2>{`"${departmentName}"员工信息列表`}</h2>
                }
                <SearchForm searchStore={searchStore} mainStore={mainStore} />
                <DeptStaffTable />
            </div>
        </Fragment>
    )
})