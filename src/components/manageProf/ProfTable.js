import React, { useEffect } from 'react';
import { Table } from 'antd';
import { useProfStore } from './stores';
import { observer } from 'mobx-react-lite';


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
    } = useProfStore();

    const columns = [
        {
            title: '职业',
            dataIndex: 'professionalName',
        },
        {
            title: '职位描述',
            dataIndex: 'description',
            ellipsis: true,
            width: 100,
        },
        {
            title: '在职人数',
            dataIndex: 'num',
        }
    ]

    const pageSet = {
        pageSize: 10,
        current: getCurrentPage,
        total: getTotalPage,
        onChange: changePage,
    }

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
            rowKey='professionalId'
            loading={getTableLoading}
            dataSource={getTableData}
            pagination={pageSet}
        />
    )
})