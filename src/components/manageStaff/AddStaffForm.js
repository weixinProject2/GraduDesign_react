import React, { Fragment, useEffect, useContext, useState } from 'react';
import { Form, Input, Button, Icon, Select, message, InputNumber } from 'antd';
import { observer } from 'mobx-react-lite';
import { createStaff, getAllStaffInfo } from '../../api';
import { MyStaffContext } from './stores';
import AddressPick from '../../tool-components/AddressPick';
import AllPostionSelect from '../../tool-components/AllPostionSelect';
import DeptsSelect from '../../tool-components/AllDeptSelect';
import ProfSelect from '../../tool-components/AllProfSelect';

const FormItem = Form.Item;

const { Option } = Select
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
const sexType = [
    {
        id: "男",
        type: "男"
    },
    {
        id: "女",
        type: '女'
    }
]

const defaultParams = {
    size: 10,
    page: 1,
    queryFiled: [],
}

const AddStaffForm = observer(({ form }) => {
    const { getFieldDecorator } = form;
    const {
        TableAttrStore: {
            setStaffVisible,
            setLoading,
            setAddDisabled, setStaffInfo, setTotalPages, setPage,
        }
    } = useContext(MyStaffContext)

    function handleCreateSubmit(e) {
        e.preventDefault();
        form.validateFields((err, value) => {
            if (!err) {
                createStaff(value).then((res) => {
                    if (!res.error) {
                        setStaffVisible(false);
                        message.success(res.message);
                        loadStaffInfo(defaultParams);
                        setPage(1);
                    } else {
                        message.error(res.message)
                    }
                })
            }
        })
    }

    function renderAllSex() {
        if (sexType) {
            return sexType.map((value, key) => {
                return <Option value={value.id} key={key}>{value.type}</Option>
            })
        }
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
        }).catch((err) => {
            console.log(err);
        })

    }

    return (
        <Fragment>
            <Form onSubmit={handleCreateSubmit} {...formItemLayout}>

                <FormItem label="员工姓名：" hasFeedback >
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: '姓名不能为空!' }, { pattern: /^[^ ]+$/, message: '不允许空格字符' }],
                    })(
                        <Input maxLength={20} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入姓名" />
                    )}
                </FormItem>

                <FormItem label="性别" hasFeedback>
                    {getFieldDecorator('sex', {
                        rules: [{ required: true, message: '性别不能为空!' }],
                    })(
                        <Select placeholder="请选择性别"  >
                            {renderAllSex()}
                        </Select>
                    )}
                </FormItem>

                <FormItem label="联系电话：" hasFeedback>
                    {getFieldDecorator('telNumber', {
                        rules: [
                            { required: true, message: '电话不能为空!' },
                            { pattern: /(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}/, message: '电话格式错误！' }
                        ],
                    })(
                        <Input prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入联系电话" />
                    )}
                </FormItem>

                <FormItem label="电子邮件" hasFeedback>
                    {getFieldDecorator('email', {
                        rules: [
                            { required: true, message: '电子邮件不能为空!' },
                            {
                                type: 'email',
                                message: '电子邮件格式不正确!',
                            },
                        ],
                    })(
                        <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入电子邮件" />
                    )}
                </FormItem>

                <FormItem label="联系地址" hasFeedback>
                    {getFieldDecorator('address', {
                        rules: [
                            { type: 'array', required: true, message: '地址不能为空!' },
                        ],
                    })(
                        <AddressPick placeholder='请选择联系地址' />
                    )}
                </FormItem>

                <FormItem label="身份证号：" hasFeedback>
                    {getFieldDecorator('Id_Card', {
                        rules: [
                            { required: true, message: '身份证号码不能为空!' },
                            { pattern: /(^\d{15}$)|(^\d{17}([0-9]|X)$)/, message: '身份证格式错误！' }
                        ],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入身份证号码" />
                    )}
                </FormItem>

                <FormItem label="部门：" hasFeedback>
                    {getFieldDecorator('departmentId', {
                        rules: [{ required: true, message: '部门不能为空!' }, { pattern: /^[^ ]+$/, message: '不允许空格字符' }],
                    })(
                        <DeptsSelect />
                    )}
                </FormItem>

                <FormItem label="职业：" hasFeedback>
                    {getFieldDecorator('professionalId', {
                        rules: [{ required: true, message: '职业不能为空!' }, { pattern: /^[^ ]+$/, message: '不允许空格字符' }],
                    })(
                        <ProfSelect />
                    )}
                </FormItem>

                <FormItem label="职位：" hasFeedback>
                    {getFieldDecorator('positionId', {
                        rules: [{ required: true, message: '职位不能为空!' }, { pattern: /^[^ ]+$/, message: '不允许空格字符' }],
                    })(
                        <AllPostionSelect />
                    )}
                </FormItem>

                <Button type="primary" htmlType="submit">
                    确认入录
                </Button>
            </Form>
        </Fragment>
    )
});

const WrappedNormalStaffForm = Form.create()(AddStaffForm);
export default WrappedNormalStaffForm;