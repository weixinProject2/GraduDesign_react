import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import { Table } from 'antd';
import { useProjectStore } from './stores';

export default observer(() => {
    const {
        mainStore: {
            loadInfo,
            getTableData,
            getTotalPage,
            getCurrentPage,
            setCurrentPage,
            getTableLoading,
        }
    } = useProjectStore();

    const pageSet = {
        pageSize: 10,
        current: getCurrentPage,
        total: getTotalPage,
        onChange: changePage,
    }

    const columns = [
        {
            title: '项目总称',
            dataIndex: 'projectName',
        },
        {
            title: '项目描述',
            dataIndex: 'describtion',
            ellipsis: true,
            width: 100,
        },
        {
            title: '在职人数',
            dataIndex: 'num',
        },
        {
            title: '项目分配部门',
            dataIndex:'bToDepartment',
        },
        {
            title: '项目部门管理员',
            dataIndex:'bToDepartmentAdmin',
        },
        {
            title: '创建日期',
            dataIndex:'createTime',
        },
        {
            title: '项目进度',
            dataIndex:'schedultion',
        },
        {
            title: '项目附件',
            dataIndex:'file',
        },
    ]

    useEffect(() => {
        loadInfo();
    }, []);

    function changePage(page){
        setCurrentPage(page);
        loadInfo();
    }

    return (
        <Table
            tableLayout='inline'
            size='small'
            columns={columns}
            rowKey='projectId'
            loading={getTableLoading}
            dataSource={getTableData}
            pagination={pageSet}
        />
    )
})