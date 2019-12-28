import React, { Fragment, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Table, Tag, Icon } from 'antd';
import { useDeptsStaffStore } from './stores';

export default observer(() => {
    const {
        mainStore: {
            loadInfo, getTableData, getTotalPage, getCurrentPage, setCurrentPage, getTableLoading,
            setSelectRows, getSelectRows,
        }
    } = useDeptsStaffStore();

    const selectionSet = {
        selectedRowKeys: getSelectRows,
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectRows(selectedRowKeys);
        },
        getCheckboxProps: record => ({
            // disabled: record.permissions === "1",
            // name: record.userName,
        }),
    }

    const columns = [
        {
            dataIndex: 'sex',
            width: 40,
            render: renderSex
        },
        {
            title: '姓名',
            dataIndex: 'userName',
            width: 80,
            ellipsis: true,
        },
        {
            title: '工号',
            dataIndex: 'workNumber',
            width: 80,
        },
        {
            title: '地址',
            dataIndex: 'address',
            width: 230,
            ellipsis: true,
        },
        {
            title: '联系电话',
            dataIndex: 'telNumber',
            ellipsis: true,
        },
        {
            title: '职位',
            dataIndex: 'position',
            ellipsis: true,
            render: (text) => <Tag color='gold'>{text}</Tag>
        },
        {
            title: '职业',
            dataIndex: 'professional',
            ellipsis: true,
            render: (text) => <Tag color='cyan'>{text}</Tag>
        },
        {
            title: '邮箱',
            dataIndex: 'email',
            ellipsis: true,
        },
        {
            title: '入职时间',
            dataIndex: 'entryTime',
            ellipsis: true,
        },
    ];

    const pageSet = {
        pageSize: 10,
        current: getCurrentPage,
        total: getTotalPage,
        onChange: changePage,
    }

    function changePage(page) {
        setCurrentPage(page);
        loadInfo();
    }
    // 渲染性别
    function renderSex(text, record) {
        return (
            <Icon
                type={text === '男' ? 'man' : 'woman'}
            />
        )
    }

    useEffect(() => {
        loadInfo();
    }, [])

    return (
        <Fragment>
            <Table
                columns={columns}
                tablelayout='inline'
                rowKey='workNumber'
                size='small'
                rowSelection={selectionSet}
                loading={getTableLoading}
                dataSource={getTableData}
                pagination={pageSet}
            />
        </Fragment>
    )
})