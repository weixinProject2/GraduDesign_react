import React, { Fragment, useEffect, useContext, useState } from 'react';
import { Form, Input, Button, Icon, Select, message, InputNumber, Modal } from 'antd';
import { observer } from 'mobx-react-lite';

import { MyDeptsContext } from './stores';

import { addNewDept, getAllDeptsInfo } from '../../api';
import AddressPick from '../../tool-components/AddressPick';

const FormItem = Form.Item;
const formItemLayout = {
    labelCol: {
        xs: { span: 12 },
        sm: { span: 5 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
    },
};

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



const AddDept = observer(({ form }) => {
    const { getFieldDecorator } = form;
    const [addBtnLoading, setBtnLoading] = useState(false);

    const {
        TableAttrStore: {
            setSearchParams, setDeptAddModalVisble, getSearchParams, setTableLoading, setBtnDisabled, setTotalPage, setTableData
        }
    } = useContext(MyDeptsContext);

    function handleAddDept(e) {
        e.preventDefault();
        form.validateFields((err, values) => {
            if (!err) {
                setBtnLoading(true);
                values.departmentAddress = values.departmentAddress.join('');
                addNewDept(values).then(async (res) => {
                    if (!res.error) {
                        setDeptAddModalVisble(false);
                        setSearchParams(defaultParams);
                        loadDeptsInfo();
                        message.success(res.mess);
                    } else if (res.error === -2) {
                        setBtnLoading(false);
                        form.setFields({
                            departmentName: {
                                errors: [new Error(res.mess)],
                            }
                        })
                    } else if (res.error === -3) {
                        setBtnLoading(false);
                        form.setFields({
                            departmentMangerId: {
                                errors: [new Error(res.mess)],
                            }
                        })
                    }
                })
            }
        })
    }

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

    return (
        <Fragment>
            <Form {...formItemLayout} onSubmit={handleAddDept}>
                <FormItem label="部门名称：" >
                    {getFieldDecorator('departmentName', {
                        rules: [{ required: true, message: '部门不能为空!' }, { pattern: /^[^ ]+$/, message: '不允许空格字符' }],
                    })(
                        <Input maxLength={20} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入部门名称" />
                    )}
                </FormItem>

                <FormItem label="部门简介：" >
                    {getFieldDecorator('departmentDesc', {
                        rules: [{ required: false }],
                    })(
                        <Input maxLength={20} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入部门简介" />
                    )}
                </FormItem>

                <FormItem label="部门地址：" >
                    {getFieldDecorator('departmentAddress', {
                        rules: [{ required: true, message: '部门地址不能为空!' }],
                    })(
                        <AddressPick placeholder="请选择部门地址" />
                    )}
                </FormItem>

                <FormItem label="管理员ID：">
                    {getFieldDecorator('departmentMangerId', {
                        rules: [{ required: false }],
                    })(
                        <InputNumber maxLength={20} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入部门管理员ID" />
                    )}
                </FormItem>
                <Button type="primary" htmlType="submit" loading={addBtnLoading}>
                    确认入录
                </Button>
            </Form>
        </Fragment>
    )
})
const WrappedNormalAddForm = Form.create()(AddDept);
export default WrappedNormalAddForm;