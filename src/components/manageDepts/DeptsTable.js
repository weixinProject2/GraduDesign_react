import React, { useEffect, useState, useContext, Fragment } from 'react';
import { observer } from 'mobx-react-lite'
import { Form, Spin, Table, Icon, Popover, Button, message, Modal, Tag, Drawer } from 'antd';

import { getAllDeptsInfo, deleteDepts } from '../../api'

import { MyDeptsContext } from './stores';

const { confirm } = Modal;

// 重置查询条件
const defaultParams = {
    size: 10,
    page: 1,
    queryparams: {
        departmentName: null,
        departmentId: null,
        departmentMangerName: null,
    }
};

export default observer(() => {
    let deleteModal;
    const {
        TableAttrStore: {
            getSearchParams, setSearchParams, getAllPage, setTotalPage, setCurrentPage, getTableLoading, setTableLoading,
            getTableData, setTableData, setBtnDisabled,
        }

    } = useContext(MyDeptsContext);

    const columns = [
        {
            title: '部门名称',
            dataIndex: 'departmentName',
            ellipsis: true,
        },
        {
            title: '部门ID',
            dataIndex: 'departmentId',
        },
        {
            title: '部门管理员',
            dataIndex: 'departmentMangerName',
            lipsis: true,
            render: (text) => text ? text : <span style={{ color: '#ff0000b0' }}>暂未设置管理员</span>
        },
        {
            title: '部门简介',
            dataIndex: 'departmentDesc',
            ellipsis: true,
        },
        {
            title: '部门地址',
            dataIndex: 'departmentAddress',
            ellipsis: true,
        },
        {
            title: '操作',
            render: renderOpts,
            width: 50,
        }
    ]

    const pageSet = {
        pageSize: 10,
        current: getSearchParams.page,
        total: getAllPage,
        onChange: changePage,
    }

    const Lists = ({ record }) => {
        return (
            <ul className='gradu-form-opts'>
                <li>修改信息</li>
                <li onClick={showDeleteConfirm.bind(this, record)}>删除</li>
            </ul>
        )
    }

    function changePage(page) {
        setCurrentPage(page);
        loadDeptsInfo();
    }

    function showDeleteConfirm(record) {
        console.log(record);
        const { departmentId } = record;
        deleteModal = confirm({
            autoFocusButton: 'cancel',
            title: '警告',
            content: <p>确认移除此部门？删除之后将不可恢复！</p>,
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk: deleteDepartment.bind(this, departmentId),

        });
    }

    function deleteDepartment(departmentId) {
        deleteModal.update({
            content: <Spin />,
            footer: null,
        })
        return new Promise((resolve, reject) => {
            deleteDepts({ departmentId }).then((res) => {
                if (res) {
                    if (!res.error) {
                        message.success(res.mess);
                        resolve();
                        loadDeptsInfo(defaultParams);
                    } else {
                        setTimeout(() => {
                            deleteModal.update({
                                content: res.mess,
                            });
                            reject();
                        }, 500);
                        
                    }
                } else {
                    message.error('删除失败');
                }
            }).catch((err) => {
                console.log(err);
            })
        })
    }

    function loadDeptsInfo(defaultParams) {
        let searchParams = defaultParams ? defaultParams : getSearchParams;
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

    function renderOpts(text, record) {
        return (
            <Popover
                content={<Lists record={record} />}
                placement="bottom"
                trigger='hover'
            >
                <Button type="dashed" shape="circle" icon='more' size='small' />
            </Popover>
        )
    }

    useEffect(() => {
        loadDeptsInfo();
    }, [])

    return (
        <Fragment>
            <Table
                size='default'
                tablelayout='inline'
                columns={columns}
                dataSource={getTableData}
                rowKey='departmentId'
                size='small'
                pagination={pageSet}
                loading={getTableLoading}
            />
        </Fragment>
    )
})