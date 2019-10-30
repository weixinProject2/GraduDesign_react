import React, { useState, useEffect, useContext } from 'react';
import { Button, Avatar, Drawer, Form, Input, Spin, Icon } from 'antd'
import { observer } from 'mobx-react-lite';

import { MyContext } from '../../stores/index';
import { MyInfoContext } from './store/index';

import ModifyUserInfo from './ModifyUserInfo';

const FormItem = Form.Item;

const UserInfoForm = observer(({ form }) => {
    const stores = useContext(MyContext);
    const myInfoStores = useContext(MyInfoContext);

    const { getUserinfo: {
        userName, imgUrl, address, departmentName, position, professional, sex, telNumber, email, workNumber
    } } = stores; //从全局层拿个人信息

    const {
        setPsVisible, getPsVisible, setInfoVisible, getInfoVisible
    } = myInfoStores


    const { getFieldDecorator } = form;

    useEffect(() => {

    }, []);

    // 渲染头像
    function renderAvater() {
        if (imgUrl) {
            return <Avatar src={imgUrl} />
        } else if (userName) {
            const nameArray = userName.split('');
            return nameArray[0].toString();
        } else {
            return '无'
        }
    }

    // 打开修改密码模态框
    function openPsModal() {
        setPsVisible(true);
    }

    // 打开修改用户信息密码
    function openInfoModal() {
        setInfoVisible(true);
    }

    // 关闭修改密码模态框
    function onPassWordModalClose() {
        setPsVisible(false);
    }
    // 关闭修改信息模态框
    function onUserInfoModalClose() {
        setInfoVisible(false);
    }

    // 提交密码数据
    function handlePsSubmit(e) {
        e.preventDefault();

    }

    function checkOldPassword() {

    }
    function compareToFirstPassword() {

    }
    function validateToNextPassword() {

    }
    function handleConfirmBlur() {

    }
    return (
        <Spin size="large" spinning={false}>
            <div className="gradu-userInfo">

                <header>
                    <Button type='primary' ghost icon='edit' onClick={openPsModal}>修改密码</Button>
                    <Button type='primary' ghost icon='unlock' onClick={openInfoModal}>修改个人信息</Button>
                </header>
                <div className="gradu-userInfo-content">
                    <h2>个人信息</h2>
                    <div className='gradu-userInfo-top'>
                        <div className='gradu-userInfo-avatar'>
                            <div className="gradu-userInfo-avatar-content">
                                <div className="gradu-userInfo-avatar-img">
                                    {renderAvater()}
                                </div>
                            </div>
                        </div>
                        <div className='gradu-userInfo-basic'>
                            <div className='gradu-userInfo-basic-lists'>
                                <span>{userName}</span>
                                <span>工号：{workNumber}</span>
                            </div>
                        </div>
                    </div>
                    <div className='gradu-userInfo-lists'>
                        <div className='gradu-userInfo-lists-content'>
                            <h3>基本信息</h3>
                            <ul>
                                <li>
                                    <span>性别：</span>
                                    <span>{sex}</span>
                                </li>
                                <li>
                                    <span>邮箱地址：</span>
                                    <span>{email}</span>
                                </li>
                                <li>
                                    <span>电话：</span>
                                    <span>{telNumber}</span>
                                </li>
                                <li>
                                    <span>地址：</span>
                                    <span>{address}</span>
                                </li>
                            </ul>
                        </div>
                        <div className='gradu-userInfo-lists-content'>
                            <h3>身份信息</h3>
                            <ul>
                                <li>
                                    <span>职位：</span>
                                    <span>{position ? position : '无'}</span>
                                </li>
                                <li>
                                    <span>职业：</span>
                                    <span>{professional ? professional : '无'}</span>
                                </li>
                                <li>
                                    <span>所属部门</span>
                                    <span>{departmentName ? departmentName : '无'}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <Drawer
                    title="修改密码"
                    placement="right"
                    width={350}
                    closable={true}
                    onClose={onPassWordModalClose}
                    visible={getPsVisible}
                    destroyOnClose
                >
                    <Form onSubmit={handlePsSubmit}>
                        <FormItem>
                            {getFieldDecorator('oldPassword', {
                                rules: [
                                    { required: true, message: '旧密码不能为空!' }, { validator: checkOldPassword }
                                ],
                            })(
                                <Input.Password prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入当前使用密码" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('newPassword', {
                                rules: [{ required: true, message: '新密码不能为空!' }, { validator: validateToNextPassword }]
                            })(
                                <Input.Password prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入新密码" maxLength={6} />
                            )}
                        </FormItem>
                        <FormItem>
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
                </Drawer>

                <Drawer
                    title="个人信息修改"
                    placement="right"
                    width={450}
                    closable={true}
                    onClose={onUserInfoModalClose}
                    visible={getInfoVisible}
                    destroyOnClose
                >
                    <ModifyUserInfo />
                </Drawer>
            </div>
        </Spin >
    )
})
const WrappedNormalLoginForm = Form.create()(UserInfoForm);
export default WrappedNormalLoginForm;