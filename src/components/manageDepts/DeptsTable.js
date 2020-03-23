import React, { useEffect, useState, useContext, Fragment } from 'react';
import { observer } from 'mobx-react-lite'
import { Form, Spin, Table, Icon, Popover, Button, message, Modal, Tag, Drawer } from 'antd';
import ModifyForm from './ModifyForm';
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
            getSearchParams, getAllPage, setTotalPage, setCurrentPage, getTableLoading, setTableLoading,
            getTableData, setTableData, setBtnDisabled, getModifyVisible, setModifyVisible, setModifyRecord,
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
            render: (text) => text ? text : <span style={{ color: '#acacac' }}>暂未设置管理员</span>
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
                <li onClick={showModifyModal.bind(this, record)}>修改信息</li>
                <li onClick={showDeleteConfirm.bind(this, record)}>删除</li>
            </ul>
        )
    }

    // 打开修改弹出窗
    function showModifyModal(record) {
        setModifyRecord(record);
        setModifyVisible(true);
    }

    //页面跳转
    function changePage(page) {
        setCurrentPage(page);
        loadDeptsInfo();
    }

    // 打开珊删除弹框
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
            footer: null,
        });
    }

    // 删除部门
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
                        setCurrentPage(1);
                    } else {
                        setTimeout(() => {
                            deleteModal.update({
                                content: res.mess,
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

    // 加载部门信息
    function loadDeptsInfo(defaultParams) {
        let searchParams = defaultParams ? defaultParams : getSearchParams;
        setTableLoading(true);
        setBtnDisabled(true);
        getAllDeptsInfo(searchParams).then((res) => {
            if (!res.error && res.data) {
                setTotalPage(res.total);
                setTableData(res.data);
                setTableLoading(false);
                setBtnDisabled(false);
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

    // 
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

    function closeModifyForm() {
        setModifyVisible(false);
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

            <Drawer
                title="部门信息修改"
                placement="right"
                width={450}
                closable={true}
                onClose={closeModifyForm}
                visible={getModifyVisible}
                destroyOnClose
            >
                <ModifyForm />
            </Drawer>
        </Fragment>
    )
})