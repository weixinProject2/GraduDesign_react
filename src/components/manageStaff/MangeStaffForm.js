import React, { useEffect, useState, useContext, Fragment } from 'react';
import { observer } from 'mobx-react-lite'
import { Form, Table, Icon, Popover, Button, message, Modal, Tag, Drawer, Badge, Tooltip } from 'antd'
import { getAllStaffInfo, deleteStaffById } from '../../api';
import { MyStaffContext } from './stores'
import ModifyForm from './ModifyForm';

const { confirm } = Modal

const defaultParams = {
    size: 10,
    page: 1,
    queryFiled: []
}


export default observer(() => {
    const {
        TableAttrStore: {
            getAllStaff, setStaffInfo,
            setLoading, getLoading,
            setRowSelection,
            getCurrentPage, setPage, getTotalPages, setTotalPages,
            setBtnDisabled,
            setAddDisabled,
            getQueryFields,
            setModifyVisible, getModifyVisible,
            setModifyRecord, getRowSelection
        }
    } = useContext(MyStaffContext);

    const selectionSet = {
        selectedRowKeys: getRowSelection,
        onChange: (selectedRowKeys, selectedRows) => {
            setRowSelection(selectedRowKeys);
            if (selectedRowKeys.length > 0) {
                setBtnDisabled(false);
            } else {
                setBtnDisabled(true);
            }
        },
        getCheckboxProps: record => ({
            disabled: record.permissions === 1,
            name: record.userName,
        }),
    }

    const Lists = ({ record }) => {
        const permissions = record.permissions;
        return (
            <ul className='gradu-form-opts'>
                <li onClick={openModifyDrawer.bind(this, record)}>修改信息</li>
                {permissions ? null : <li onClick={showDeleteConfirm.bind(this, record)}>删除</li>}
            </ul>
        )
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
            render: renderName,
            width: 100,
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
            title: '所在部门',
            dataIndex: 'departmentName',
            ellipsis: true,
            render: renderDept,
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
        {
            title: '操作',
            width: 50,
            render: renderOpts
        },

    ];

    const pageSet = {
        pageSize: 10,
        current: getCurrentPage,
        total: getTotalPages,
        onChange: changePage,
    }


    function renderDept(text) {
        return (
            <Fragment>
                {
                    text ? <Tag color='green'>{text}</Tag> : <span style={{ color: '#acacac' }}>暂未设置部门</span>
                }
            </Fragment>
        )
    }

    // page触发分页
    function changePage(page) {
        setPage(page);
        const params = {
            page: page,
            queryFiled: getQueryFields
        }
        loadStaffInfo(params);
    }

    // 加载数据
    function loadStaffInfo(params, msgSuccess) {
        setLoading(true);
        const { page, size, queryFiled } = params && params

        const object = {
            page: page ? page : 1,
            size: size ? size : 10,
            queryFiled: queryFiled ? queryFiled : null
        }

        getAllStaffInfo(object).then((data) => {
            setAddDisabled(true);
            if (data.list) {
                setLoading(false);
                setStaffInfo(data.list);
                setTotalPages(data.total);
                setAddDisabled(false)
                if (msgSuccess) {
                    message.success(msgSuccess);
                }
            } else {
                setLoading(false);
                setStaffInfo([]);
                setTotalPages(0);
                setAddDisabled(false)
                message.error("加载失败！");
            }
        })
    }

    function renderName(value, record) {
        const status = record.permissions === 1;
        return (
            <Tooltip
                placement="top"
                title={status ? `${record.departmentName}管理员${value}` : value}
            >
                {value}&nbsp;
                {status && <Tag color='blue'>管</Tag>}
            </Tooltip>
        )
    }
    // 渲染用户操作
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

    // 渲染性别
    function renderSex(text, record) {
        return (
            <Icon
                type={text === '男' ? 'man' : 'woman'}
            />
        )
    }

    // 删除员工
    function deleteStaff(workNumber) {
        const object = {
            'ids': JSON.stringify([workNumber]),
        }
        const params = {
            page: getCurrentPage,
            size: 10,
            queryFiled: getQueryFields
        }
        deleteStaffById(object).then((res) => {
            if (!res.error) {
                loadStaffInfo(params, '删除成功！');
                return true;
            } else {
                message.error(res.message);
                return false;
            }
        })
    }

    // 打开删除对话框
    function showDeleteConfirm(record) {
        const { workNumber, userName } = record;
        confirm({
            title: '警告',
            content: <p>确认删除工号为<strong>{workNumber}</strong>的{userName}员工？删除之后将不可恢复！</p>,
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk: deleteStaff.bind(this, workNumber),
        });
    }

    function closeModifyForm() {
        setModifyRecord([]);
        setModifyVisible(false);
    }
    function openModifyDrawer(record) {
        setModifyRecord(record);
        setModifyVisible(true);
    }

    useEffect(() => {
        loadStaffInfo(defaultParams);
    }, [])

    return (
        <Fragment>
            <Table
                tablelayout='inline'
                columns={columns}
                dataSource={getAllStaff}
                rowKey='workNumber'
                size='small'
                rowSelection={selectionSet}
                pagination={pageSet}
                loading={getLoading}
            />
            <Drawer
                title="员工信息修改"
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