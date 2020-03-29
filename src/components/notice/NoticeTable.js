import React, { useEffect } from 'react';

import { Table, Tooltip } from 'antd';
import { observer } from 'mobx-react-lite';
import { useNoticeStore } from './stores';
import { NavLink } from 'react-router-dom';
import history from '../../utils/history';


export default observer(() => {
    const {
        mainStore: {
            getCurrentPage,
            getTotalPage,
            loadInfo,
            setCurrentPage,
            getTableLoading,
            getTableData,
        }
    } = useNoticeStore();

    useEffect(() => {
        loadInfo();
    }, [])

    function changePage(page) {
        setCurrentPage(page);
        loadInfo();
    }

    const pageSet = {
        pageSize: 10,
        current: getCurrentPage,
        total: getTotalPage,
        onChange: changePage,
    }

    function goDetail(anmountId) {
        history.push({
            pathname: '/main/notice/detail',
            search: `?noticeId=${anmountId}`,
            state: {
                oldPathname: '/main/notice',
            },
        });
    }

    const renderLink = (text, record) => (
        <Tooltip title={`查看${text}公告详情`}>
            <span className="gradu-notice-link"  onClick={goDetail.bind(this, record.anmountId)}>{text}</span>
        </Tooltip>
    )

    const columns = [
        {
            title: '标题',
            dataIndex: 'title',
            render: renderLink,
        },
        {
            title: '创建日期',
            dataIndex: 'createTime',
            // render: renderDate,
        },
    ];

    return (
        <Table
            tableLayout='inline'
            size='small'
            columns={columns}
            rowKey='anmountId'
            loading={getTableLoading}
            dataSource={getTableData}
            pagination={pageSet}
        />
    )
})