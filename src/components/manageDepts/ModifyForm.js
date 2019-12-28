import React, { useState, useEffect, Fragment, useContext } from 'react';
import { observer } from 'mobx-react-lite'
import { Form, Input, InputNumber, Icon, Button, message } from 'antd';
import { MyDeptsContext } from './stores';
import { getAllDeptsInfo, modifyDepts } from '../../api'
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
const FormItem = Form.Item;

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

const ModifyDeptForm = observer(({ form }) => {
    const { getFieldDecorator } = form;
    const [addBtnLoading, setBtnLoading] = useState(false);

    const {
        TableAttrStore: {
            getSearchParams, setSearchParams, setTotalPage, setTableLoading,
            setTableData, setBtnDisabled, setModifyVisible,
            getModifyRecord: { departmentName, departmentDesc, departmentAddress, departmentMangerId, departmentId }
        }
    } = useContext(MyDeptsContext)

    function handleModifySubmit(e) {
        e.preventDefault();
        form.validateFields((err, values) => {
            if (!err) {
                setBtnLoading(true);
                let obj = values;
                obj.departmentId = departmentId;
                modifyDepts(obj).then((res) => {
                    if (!res.error) {
                        setModifyVisible(false);
                        message.success(res.mess);
                        loadDeptsInfo(defaultParams);
                    } else if (res.error === -2) {
                        form.setFields({
                            departmentMangerId: {
                                errors: [new Error(res.mess)],
                                value: ''
                            }
                        })
                        setBtnLoading(false);
                    } else if (res.error === -1) {
                        form.setFields({
                            departmentMangerId: {
                                errors: [new Error(res.mess)],
                                value: ''
                            }
                        })
                        setBtnLoading(false);
                    } else if (res.error === -3) {
                        form.setFields({
                            departmentName: {
                                errors: [new Error(res.mess)],
                                value: '',
                            }
                        })
                        setBtnLoading(false);
                    }
                })
            }
        })
    }

    // 加载部门信息
    function loadDeptsInfo(defaultParams) {
        let searchParams = defaultParams ? defaultParams : getSearchParams;
        if (defaultParams) {
            setSearchParams(defaultParams);
        }
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
            <Form onSubmit={handleModifySubmit} {...formItemLayout}>
                <FormItem label="部门名称：" >
                    {getFieldDecorator('departmentName', {
                        initialValue: departmentName,
                        rules: [{ required: true, message: '部门不能为空!' }, { pattern: /^[^ ]+$/, message: '不允许空格字符' }],
                    })(
                        <Input maxLength={20} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入部门名称" />
                    )}
                </FormItem>

                <FormItem label="部门简介：" >
                    {getFieldDecorator('departmentDesc', {
                        rules: [{ required: false }],
                        initialValue: departmentDesc,
                    })(
                        <Input maxLength={20} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入部门简介" />
                    )}
                </FormItem>

                <FormItem label="部门地址：" >
                    {getFieldDecorator('departmentAddress', {
                        rules: [{ required: true, message: '部门地址不能为空!' }],
                        initialValue: departmentAddress,
                    })(
                        <Input maxLength={20} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入部门地址" />
                    )}
                </FormItem>

                <FormItem label="管理员ID：">
                    {getFieldDecorator('departmentMangerId', {
                        rules: [{ required: false }],
                        initialValue: departmentMangerId,
                    })(
                        <InputNumber maxLength={20} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入部门管理员ID" />
                    )}
                </FormItem>
                <Button type="primary" htmlType="submit" loading={addBtnLoading}>
                    确认修改
                </Button>
            </Form>
        </Fragment>
    )
});

const WrappedNormalModifyDeptForm = Form.create()(ModifyDeptForm);
export default WrappedNormalModifyDeptForm;