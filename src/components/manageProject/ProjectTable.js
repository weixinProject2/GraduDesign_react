import React, { useEffect, Fragment } from 'react';
import { observer } from 'mobx-react-lite';

import { Table, Tag, Progress, Popover, Button, Modal, message, Form } from 'antd';
import { useProjectStore } from './stores';
import { deleteProject, distributeProject } from '../../api';
import DepartSelect from '../../tool-components/AllDeptSelect';
import StatusTag from '../../tool-components/StatusTag';

const FormItem = Form.Item;

const { confirm } = Modal;

const DistributeForm = observer(({ form }) => {
    const { getFieldDecorator } = form;
    const {
        mainStore: {
            getProjectId,
            setDistributeVisible,
            setProjectId,
            loadInfo,
        }
    } = useProjectStore();

    function handleSubmit(e) {
        e.preventDefault();
        form.validateFields((err, value) => {
            if (!err) {
                value.projectId = getProjectId;
                distributeProject(value).then((res) => {
                    if (!res.error) {
                        setProjectId('');
                        setDistributeVisible(false);
                        message.success(res.message);
                        loadInfo();
                    } else {
                        message.error(res.message);
                        setDistributeVisible(false);
                    }
                })
            }
        })
    }

    function cancelModal() {
        setDistributeVisible(false);
        setProjectId('');
    }

    return (
        <Fragment>
            <Form onSubmit={handleSubmit} layout="inline" style={{ height: '83px' }}>
                <FormItem label="部门：" hasFeedback >
                    {getFieldDecorator('bToDepartmentID', {
                        rules: [{ required: true, message: '所分配的部门不能为空!' }, { pattern: /^[^ ]+$/, message: '不允许空格字符' }],
                    })(
                        <DepartSelect />
                    )}
                </FormItem>

                <FormItem>
                    <Button type="primary" htmlType="submit">
                        确认分配
                    </Button >
                    <Button onClick={cancelModal} style={{ marginLeft: '20px' }}>
                        取消
                    </Button>
                </FormItem>
            </Form>
        </Fragment>
    )
})
const WrappedNormalDistributeForm = Form.create()(DistributeForm);


export default observer(() => {
    const {
        mainStore: {
            loadInfo,
            getTableData,
            getTotalPage,
            getCurrentPage,
            setCurrentPage,
            getTableLoading,
            setDistributeVisible,
            getDistributeModalVisible,
            setProjectId,
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

    const renderProject = (text, record) => (
        <Tag color='green'>{text}</Tag>
    );

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


    function deleteOneProject(projectId) {
        const params = {
            'projectId': projectId
        }
        deleteProject(params).then((res) => {
            if (!res.error) {
                loadInfo();
                message.success(res.message);
                return true
            } else {
                message.error(res.message);
                return false;
            }
        })
    }

    function showDistribeModal(record) {
        const { projectId } = record;
        setDistributeVisible(true);
        setProjectId(projectId);
    }

    // 打开删除对话框
    function showDeleteConfirm(record) {
        const { projectName, projectId } = record;
        confirm({
            title: '警告',
            content: <p>确认删除<strong>{projectName}</strong>项目吗？删除之后将不可恢复！</p>,
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk: deleteOneProject.bind(this, projectId),
        });
    }

    const Lists = ({ record }) => {
        const hasDept = record.bToDepartmentID;
        const schedultion = record.schedultion;
        const isOpen = record.isOpen;
        return (
            <ul className='gradu-form-opts'>
                {(schedultion !== 100 && !isOpen) && <li onClick={showDistribeModal.bind(this, record)}>分配项目</li>}
                {(schedultion === 100 || !hasDept) && <li onClick={showDeleteConfirm.bind(this, record)}>删除</li>}
            </ul>
        )
    }

    const renderOpts = (text, record) => (
        <Popover
            content={<Lists record={record} />}
            placement="bottom"
            trigger='click'
        >
            {!record.isOpen && <Button type="dashed" shape="circle" icon='more' size='small' />}
        </Popover>
    )

    const renderProjectStatus = (text, record) => {
        return (
            <StatusTag status={text ? "default" : "create"}
                text={text ? "已开启" : '未开启'}
                size={10} />
        )
    }


    const columns = [
        {
            title: '项目总称',
            dataIndex: 'projectName',
            render: renderProject,
        },
        {
            title: '项目描述',
            dataIndex: 'describtion',
        },
        {
            title: '项目分配部门',
            dataIndex: 'departmentName',
            render: renderDepts,
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
            title: '项目状态',
            dataIndex: 'isOpen',
            render: renderProjectStatus
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

    function handleDistributeCancel() {
        setDistributeVisible(false);
        setProjectId('');
    }

    return (
        <Fragment>
            <Table
                tableLayout='inline'
                size='small'
                columns={columns}
                rowKey='projectId'
                loading={getTableLoading}
                dataSource={getTableData}
                pagination={pageSet}
            />
            <Modal
                title="分配项目到部门"
                visible={getDistributeModalVisible}
                // onOk={this.handleOk}
                footer={null}
                onCancel={handleDistributeCancel}
            >
                <WrappedNormalDistributeForm />
                <p
                    style={{ color: '#de0000c2' }}
                >*注意：一个项目只能分配到一个部门，并且不可逆</p>
            </Modal>
        </Fragment>
    )
})