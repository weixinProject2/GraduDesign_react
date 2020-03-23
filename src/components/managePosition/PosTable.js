import React, { useEffect, Fragment } from 'react';
import { Table, Modal, Popover, Button, Spin, message } from 'antd';
import { usePositionsStore } from './stores';
import { observer } from 'mobx-react-lite';
import { deletePosition } from '../../api';

const { confirm } = Modal;

export default observer(() => {
    let deleteModal;
    const {
        mainStore: {
            loadInfo,
            getTableData,
            getTotalPage,
            getCurrentPage,
            setCurrentPage,
            getTableLoading,
        }
    } = usePositionsStore();

    const pageSet = {
        pageSize: 10,
        current: getCurrentPage,
        total: getTotalPage,
        onChange: changePage,
    }

    const renderDescription = (text, record) => (
        <Fragment>
            <span style={{ color: !text && '#acacac' }}>{text || '暂无相关描述'}</span>
        </Fragment>
    );

    const columns = [
        {
            title: '职位',
            dataIndex: 'positionName',
        },
        {
            title: '职位描述',
            dataIndex: 'description',
            render: renderDescription,
        },
        {
            title: '在职人数',
            dataIndex: 'totalNumbers',
        },
        {
            title: '操作',
            render: renderOpts,
            width: 50,
        }
    ]

    useEffect(() => {
        loadInfo();
    }, []);

    function changePage(page) {
        setCurrentPage(page);
        loadInfo();
    }


    const Lists = ({ record }) => {
        return (
            <ul className='gradu-form-opts'>
                <li onClick={showModifyModal.bind(this, record)}>修改信息</li>
                {
                    record.totalNumbers === 0 ? <li onClick={showDeleteConfirm.bind(this, record)}>删除</li> : null
                }
            </ul>
        )
    }

    function showModifyModal() {

    }

    // 打开珊删除弹框
    function showDeleteConfirm(record) {
        const { positionId } = record;
        deleteModal = confirm({
            autoFocusButton: 'cancel',
            title: '警告',
            content: <p>确认删除这个职位？删除之后将不可恢复！</p>,
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk: deletePos.bind(this, positionId),
            footer: null,
        });
    }

    function deletePos(positionId) {
        deleteModal.update({
            content: <Spin />,
            footer: null,
        })
        return new Promise((resolve, reject) => {
            deletePosition({ positionId }).then((res) => {
                if (res) {
                    if (!res.error) {
                        message.success(res.message);
                        resolve();
                        loadInfo();
                        setCurrentPage(1);
                    } else {
                        setTimeout(() => {
                            deleteModal.update({
                                content: res.message,
                                okText: '确定',
                                onOk: () => deleteModal.destroy(),
                            });
                            reject();
                        }, 500);

                    }
                } else {
                    message.error('删除失败');
                }
            })
        })
    }
    function renderOpts(text, record) {
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
    return (
        <Fragment>
            <Table
                columns={columns}
                tableLayout='inline'
                size='small'
                rowKey='positionId'
                loading={getTableLoading}
                dataSource={getTableData}
                pagination={pageSet}
            />
        </Fragment>
    )
})