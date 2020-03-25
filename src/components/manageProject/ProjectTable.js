import React, { useEffect, Fragment } from 'react';
import { observer } from 'mobx-react-lite';

import { Table, Tag, Progress, Popover, Button } from 'antd';
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

    const renderDepts = (text, record) => (
        <Fragment>
            {
                text ? <Tag color='blue'>{text}</Tag> : <span style={{ color: '#acacac' }}>暂未分配到指定部门</span>
            }
        </Fragment>
    )

    const renderDeptsAdmin = (text, record) => (
        <Fragment>
            {
                text ? <Tag color='green'>{text}</Tag> : <span style={{ color: '#acacac' }}>暂未设置部门管理员</span>
            }
        </Fragment>
    )

    const renderSchedultion = (text, record) => (
        <Progress
            strokeColor={{
                from: 'rgb(52, 217, 255)',
                to: '#17b3a3',
            }}
            percent={text}
            status="active"
        />
    )

    const Lists = ({ record }) => {
        const permissions = record.permissions;
        return (
            <ul className='gradu-form-opts'>
                {/* <li onClick={openModifyDrawer.bind(this, record)}>修改信息</li>
                {permissions === "1" ? null : <li onClick={showDeleteConfirm.bind(this, record)}>删除</li>} */}
            </ul>
        )
    }

    const renderOpts = (text, record) => {
        return (
            <Popover
                content={<Lists record={record} />}
                placement="bottom"
                trigger='click'
            >
                <Button type="dashed" shape="circle" icon='more' size='small' />
            </Popover>
        )
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
            title: '项目分配部门',
            dataIndex: 'bToDepartment',
            render: renderDepts,
        },
        {
            title: '项目部门管理员',
            dataIndex: 'bToDepartmentAdmin',
            render: renderDeptsAdmin,
        },
        {
            title: '创建日期',
            dataIndex: 'createTime',
        },
        {
            title: '项目进度',
            dataIndex: 'schedultion',
            render: renderSchedultion,
        },
        {
            title: '操作',
            width: 50,
            render: renderOpts
        },
    ]

    useEffect(() => {
        loadInfo();
    }, []);

    function changePage(page) {
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