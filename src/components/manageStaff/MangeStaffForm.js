import React, { useEffect, useState, useContext, Fragment } from 'react';
import { observer } from 'mobx-react-lite'
import { Form, Table, Icon, Popover, Button, message, Tooltip, Modal, Tag, Drawer } from 'antd'
import { getAllStaffInfo, deleteStaffById } from '../../api';
import { MyStaffContext } from './stores'

const { confirm } = Modal

const defaultParams = {
    size: 10,
    page: 1,
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
            getQueryFields
        }
    } = useContext(MyStaffContext);

    const selectionSet = {
        onChange: (selectedRowKeys, selectedRows) => {
            setRowSelection(selectedRowKeys);
            if (selectedRowKeys.length > 0) {
                setBtnDisabled(false);
            } else {
                setBtnDisabled(true);
            }
        },
        getCheckboxProps: record => ({
            disabled: record.permissions === "1",
            name: record.userName,
        }),
    }

    const Lists = ({ record }) => {
        const permissions = record.permissions;
        return (
            <ul className='gradu-form-opts'>
                <li>修改信息</li>
                {permissions === "1" ? null : <li onClick={showDeleteConfirm.bind(this, record)}>删除</li>}
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
            title: '所在部门',
            dataIndex: 'departmentName',
            ellipsis: true,
            render: (text) => <Tag color='green'>{text}</Tag>
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
                setTimeout(() => {
                    setLoading(false);
                    setStaffInfo(data.list);
                    setTotalPages(data.total);
                    setAddDisabled(false)
                    if (msgSuccess) {
                        message.success(msgSuccess);
                    }
                }, 500);
            } else {
                setTimeout(() => {
                    setLoading(false);
                    setStaffInfo([]);
                    setTotalPages(0);
                    setAddDisabled(false)
                    message.error("加载失败！");
                }, 500);
            }
        }).catch((err) => {
            console.log(err);
        })

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

    useEffect(() => {
        loadStaffInfo(defaultParams);
    }, [])

    return (
        <Fragment>
            <Table
                size='default'
                tablelayout='inline'
                columns={columns}
                dataSource={getAllStaff}
                rowKey='workNumber'
                size='small'
                rowSelection={selectionSet}
                pagination={pageSet}
                loading={getLoading}
            />

        </Fragment>
    )
})