import React, { useContext, useState } from 'react';
import { Form, Button, Input, Icon, message } from 'antd';
import { observer } from 'mobx-react-lite';
import { MyContext } from '../../stores/index';
import { MyInfoContext } from './store/index';

import { changePassWord } from '../../api'

import history from '../../utils/history';

const FormItem = Form.Item;

const ModifyPassword = observer(({ form }) => {
    const { getFieldDecorator } = form;

    const [confirmDirty, changeConfirm] = useState(false);

    const stores = useContext(MyContext);
    const userInfoStores = useContext(MyInfoContext);

    const { getUserinfo: { workNumber } } = stores;

    const {
        setPsVisible,
    } = userInfoStores;


    function handleConfirmBlur(e) {
        const value = e.target.value;
        changeConfirm(confirmDirty || !!value);
    }

    function handlePsSubmit(e) {
        e.preventDefault();
        form.validateFields((err, values) => {
            if (!err) {
                let { oldPassword, newPassword } = values;
                let object = {
                    oldPassword, newPassword, workNumber
                }
                changePassWord(object).then((data) => {
                    if (data.error === -1) {
                        form.setFields({
                            oldPassword: {
                                errors: [new Error(data.message)],
                            }
                        })
                    } else if (data.error === 0) {
                        message.success(`${data.message}`);
                        setPsVisible(false)
                    }
                })
            }
        })
    }

    function validateToNextPassword(rule, value, callback) {
        if (value && confirmDirty) {
            form.validateFields(['confirmPassword'], { force: true });
        } else if (value && value === form.getFieldValue('oldPassword')) {
            callback('新密码不能与旧密码相同');
        }
        callback();
    }

    function compareToFirstPassword(rule, value, callback) {
        if (value && value !== form.getFieldValue('newPassword')) {
            callback('两次输入的密码不一致');
        } else if (value && value === form.getFieldValue('oldPassword')) {
            callback('新密码不能与旧密码相同')
        }
        else {
            callback();
        }
    }

    return (
        <Form onSubmit={handlePsSubmit}>
            <FormItem hasFeedback>
                {getFieldDecorator('oldPassword', {
                    rules: [
                        { required: true, message: '旧密码不能为空!' }
                    ],
                    validateTrigger: 'onChange', // 校验节点的时机 
                })(
                    <Input.Password prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入当前使用密码" />
                )}
            </FormItem>
            <FormItem hasFeedback>
                {getFieldDecorator('newPassword', {
                    rules: [{ required: true, message: '新密码不能为空!' }, { validator: validateToNextPassword }]
                })(
                    <Input.Password prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入新密码" maxLength={6} />
                )}
            </FormItem>
            <FormItem hasFeedback>
                {getFieldDecorator('confirmPassword', {
                    rules: [{ required: true, message: '确认密码不能为空!' }, { validator: compareToFirstPassword }],
                })(
                    <Input.Password
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="请再次输入新密码"
                        maxLength={6}
                        onBlur={handleConfirmBlur}
                    />
                )}
            </FormItem>

            <Button type="primary" htmlType="submit" className="login-form-button">
                确认修改
            </Button>
        </Form>
    )
})
const WrappedNormalPSForm = Form.create()(ModifyPassword);
export default WrappedNormalPSForm;