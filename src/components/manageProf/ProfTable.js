import React, { useEffect, Fragment } from 'react';
import { Table, Popover, Button, Modal, Spin, message, Tag } from 'antd';
import { useProfStore } from './stores';
import { observer } from 'mobx-react-lite';
import { deleteProfessional } from '../../api';

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
    } = useProfStore();

    const renderDescription = (text, record) => (
        <Fragment>
            <span style={{ color: !text && '#acacac' }}>{text || '暂无相关描述'}</span>
        </Fragment>
    );

    const renderNumber = (text, record) => (
        <span style={{ fontWeight: "bold" }}>{text}</span>
    )

    const columns = [
        {
            title: '职业',
            dataIndex: 'professionalName',
        },
        {
            title: '职业描述',
            dataIndex: 'description',
            render: renderDescription,
        },
        {
            title: '在职人数',
            dataIndex: 'num',
            render: renderNumber,
        },
        {
            title: '操作',
            render: renderOpts,
            width: 50,
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

    const Lists = ({ record }) => (
        record.num === 0 ? (
            <ul className='gradu-form-opts'>
                <li onClick={showDeleteConfirm.bind(this, record)}>删除</li>
            </ul>
        ) : null
    )

    function showDeleteConfirm(record) {
        const { professionalId } = record;
        deleteModal = confirm({
            autoFocusButton: 'cancel',
            title: '警告',
            content: <p>确认删除这个职业？删除之后将不可恢复！</p>,
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk: deleteProf.bind(this, professionalId),
            footer: null,
        });
    }

    function deleteProf(professionalId) {
        deleteModal.update({
            content: <Spin />,
            footer: null,
        })
        return new Promise((resolve, reject) => {
            deleteProfessional({ professionalId }).then((res) => {
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
        return record.num === 0 ? (
            <Popover
                content={<Lists record={record} />}
                placement="bottom"
                trigger='click'
            >
                <Button type="dashed" shape="circle" icon='more' size='small' />
            </Popover>
        ) : null
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