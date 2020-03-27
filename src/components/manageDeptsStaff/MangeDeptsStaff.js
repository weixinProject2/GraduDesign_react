import React, { Fragment, useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, message } from 'antd';

import { getProfessional, getPosition, deleteDeptStaff } from '../../api';

import { useDeptsStaffStore } from './stores'
import DeptStaffTable from './DeptStaffTable';
import SearchForm from './SearchForm';
import TableHeader from '../../tool-components/TableHeader';

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

    const headerBtns = (
        <Fragment>
            <Button
                icon="usergroup-delete"
                ghost type='danger'
                disabled={!getSelectRows.length > 0}
                onClick={removeStaff}
            >移除员工</Button>
            <Button type="primary" icon="reload" ghost onClick={loadInfo} disabled={getBtnDisabled}>刷新</Button>
        </Fragment>
    )

    return (
        <Fragment>
            <TableHeader headerButtons={headerBtns} />
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