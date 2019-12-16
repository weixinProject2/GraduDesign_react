import React, { Fragment, useEffect, useContext, useState } from 'react';
import { Form, Input, Button, Icon, Select, message, InputNumber } from 'antd';
import { observer } from 'mobx-react-lite';
import { getDepartment, getProfessional, getPosition, createStaff, getAllStaffInfo } from '../../api';
import { MyStaffContext } from './stores';
import AddressPick from '../../tool-components/AddressPick';

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
}

const AddStaffForm = observer(({ form }) => {
    const { getFieldDecorator } = form;
    const {
        TableAttrStore: {
            getAddBtnLoading, setAddBtnLoading,
            setStaffVisible,
            setLoading,
            setAddDisabled, setStaffInfo, setTotalPages, setPage,
            getAllDeptsOpts, getAllPf, getAllPos
        }
    } = useContext(MyStaffContext)

    useEffect(() => {

    }, [])



    function handleCreateSubmit(e) {
        e.preventDefault();
        form.validateFields((err, value) => {
            if (!err) {
                setAddBtnLoading(true);
                value.address = value.address.join('');
                createStaff(value).then((res) => {
                    if (!res.error) {
                        setAddBtnLoading(false);
                        setStaffVisible(false);
                        message.success(res.message);
                        loadStaffInfo(defaultParams);
                        setPage(1);
                    } else {
                        setAddBtnLoading(false);
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

    // 获取所有部门放到select框中
    function renderAllDeps() {
        return getAllDeptsOpts.map((value, key) => {
            return <Option value={value.departmentId} key={key}>{value.departmentName}</Option>
        })
    }

    // 渲染所有职业
    function renderAllProf() {
        return getAllPf.map((value, key) => {
            return <Option value={value.professionalId} key={key}>{value.professionalName}</Option>
        })
    }

    // 渲染所有职位
    function renderAllPos() {
        return getAllPos.map((value, key) => {
            return <Option value={value.positionId} key={key}>{value.positionName}</Option>
        })
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
                        // initialValue: ['北京市', '北京城区', '怀柔区'],
                        rules: [
                            { type: 'array', required: true, message: '地址不能为空!' },
                        ],
                    })(
                        <AddressPick />
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
                        <Select placeholder="请选择部门"
                            allowClear
                            showSearch
                            filterOption={(input, option) =>
                                option.props.children.indexOf(input) >= 0
                            }
                        >
                            {renderAllDeps()}
                        </Select>
                    )}
                </FormItem>

                <FormItem label="职业：" hasFeedback>
                    {getFieldDecorator('professionalId', {
                        rules: [{ required: true, message: '职业不能为空!' }, { pattern: /^[^ ]+$/, message: '不允许空格字符' }],
                    })(
                        <Select
                            placeholder="请选择职业"
                            allowClear
                            showSearch
                            filterOption={(input, option) =>
                                // console.log(input, option)
                                option.props.children.indexOf(input) >= 0
                            }
                        >
                            {renderAllProf()}
                        </Select>
                    )}
                </FormItem>

                <FormItem label="职位：" hasFeedback>
                    {getFieldDecorator('positionId', {
                        rules: [{ required: true, message: '职位不能为空!' }, { pattern: /^[^ ]+$/, message: '不允许空格字符' }],
                    })(
                        <Select
                            placeholder="请选择职位"
                            allowClear
                            showSearch
                            filterOption={(input, option) =>
                                // console.log(input, option)
                                option.props.children.indexOf(input) >= 0
                            }
                        >
                            {renderAllPos()}
                        </Select>
                    )}
                </FormItem>

                <Button type="primary" htmlType="submit" loading={getAddBtnLoading}>
                    确认入录
                </Button>
            </Form>
        </Fragment>
    )
});

const WrappedNormalStaffForm = Form.create()(AddStaffForm);
export default WrappedNormalStaffForm;