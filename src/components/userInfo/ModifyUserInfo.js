import React, { useContext, useEffect, useState } from 'react'

import { Form, Icon, Input, Button, message } from 'antd';
import { MyContext } from '../../stores/index';
import { MyInfoContext } from './store/index'
import { observer } from 'mobx-react-lite'
import { changeUserInfo } from '../../api/index'

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

const ModifyUserInfo = observer(({ form }) => {
    const { getFieldDecorator } = form;

    const [btnLoading, setBtnLoading] = useState(false)
    const [btnAble, setBtnAble] = useState(false);

    const userInfoStores = useContext(MyInfoContext);
    const stores = useContext(MyContext);

    const {
        getUserinfo: {
            userName, address, departmentName, position, professional, sex, telNumber, email, workNumber
        },
        setUserInfo,
    } = stores;

    const {
        setInfoVisible,
    } = userInfoStores;



    useEffect(() => {

    }, [])

    function handleUserInfoSubmit(e) {
        e.preventDefault();
        form.validateFields((err, values) => {
            if (!err) {
                setBtnLoading(true); // 让btn转起来
                let object = values;
                object.workNumber = workNumber;
                changeUserInfo(object).then((data) => {
                    setBtnLoading(false);
                    setUserInfo(object);
                    setInfoVisible(false);
                    message.success("修改成功");
                }).catch((err) => {
                    message.info(err);
                    setBtnLoading(false);
                })
            }
        })
    }



    return (
        <Form onSubmit={handleUserInfoSubmit} {...formItemLayout}>
            <FormItem label="姓名：">
                {getFieldDecorator('userName', {
                    rules: [
                        { required: true, message: '用户名不能为空!' },
                    ],
                    initialValue: userName
                })(
                    <Input disabled prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="姓名" />
                )}
            </FormItem>
            <FormItem label="性别：">
                {getFieldDecorator('sex', {
                    rules: [{ required: true, message: '新密码不能为空!' },],
                    initialValue: sex,
                })(
                    <Input disabled prefix={<Icon type="meh" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="新密码" maxLength={6} />
                )}
            </FormItem>
            <FormItem label="地址：">
                {getFieldDecorator('address', {
                    rules: [{ required: true, message: '联系地址不能为空' }],
                    initialValue: address,
                })(
                    <Input
                        prefix={<Icon type="home" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="请输入地址"
                    />
                )}
            </FormItem>
            <FormItem label="电话：">
                {getFieldDecorator('telNumber', {
                    rules: [
                        { required: true, message: '联系电话不能为空' },
                        { pattern: /^1(3|4|5|6|7|8|9)\d{9}$/, message: '手机电话格式错误！' },
                    ],
                    initialValue: telNumber,
                })(
                    <Input
                        prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="请输入联系电话"
                    />
                )}
            </FormItem>
            <FormItem label="E-mail：">
                {getFieldDecorator('email', {
                    rules: [{ required: true, message: '邮箱不能为空' }, {
                        type: 'email',
                        message: '电子邮件格式不正确!',
                    }],
                    initialValue: email,
                })(
                    <Input
                        prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="请输入邮箱"
                    />
                )}
            </FormItem>
            <FormItem label="职位：">
                {getFieldDecorator('position', {
                    rules: [
                        { required: true, message: '职位不能为空!' },
                    ],
                    initialValue: position
                })(
                    <Input disabled prefix={<Icon type="contacts" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="职位" />
                )}
            </FormItem>
            <FormItem label="职业：">
                {getFieldDecorator('professional', {
                    rules: [
                        { required: true, message: '职业不能为空!' },
                    ],
                    initialValue: professional
                })(
                    <Input disabled prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="职业" />
                )}
            </FormItem>
            <FormItem label="所在部门：">
                {getFieldDecorator('departmentName', {
                    rules: [
                        { required: true, message: '部门不能为空!' },
                    ],
                    initialValue: departmentName
                })(
                    <Input disabled prefix={<Icon type="team" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="部门" />
                )}
            </FormItem>
            <Button type="primary" htmlType="submit" loading={btnLoading}>
                确认修改
            </Button>
        </Form>
    )
})
const WrappedNormalLoginForm = Form.create()(ModifyUserInfo);
export default WrappedNormalLoginForm;