import React, { Fragment, useState, useEffect, useContext } from 'react';
import { observer } from 'mobx-react-lite'
import { Form, Button, Input, Icon, Select, message } from 'antd';
import { MyStaffContext } from './stores'
import { modifyStaff, getAllStaffInfo } from '../../api';
import AllPostionSelect from '../../tool-components/AllPostionSelect';

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
const { Option } = Select;

const ModifyForm = observer(({ form }) => {
    const { getFieldDecorator } = form;
    const {
        TableAttrStore: {
            getAllDeptsOpts, getAllPf, setModifyVisible,
            setLoading, getCurrentPage, getQueryFields, setAddDisabled, setStaffInfo, setTotalPages,
            getModifyRecord: { Id_Card, address, permissions, departmentId, positionId, email, professionalId, sex, telNumber, userName, workNumber }
        }
    } = useContext(MyStaffContext)
    const [btnLoading, changeBtnloading] = useState(false);


    useEffect(() => {
    }, [])

    function handleModifySubmit(e) {
        e.preventDefault();
        form.validateFields((err, values) => {
            if (!err) {
                let object = values;
                object.workNumber = workNumber;
                changeBtnloading(true);
                modifyStaff(object).then((res) => {
                    if (!res.error) {
                        const params = {
                            page: getCurrentPage,
                            size: 10,
                            queryFiled: getQueryFields,
                        }
                        changeBtnloading(false);
                        setModifyVisible(false);
                        message.success(res.message);
                        loadStaffInfo(params);
                    } else {
                        changeBtnloading(false);
                        message.error(res.message);
                    }
                })
            }
        })
    }
    // 加载数据
    function loadStaffInfo(params, msgSuccess) {
        setLoading(true);
        setAddDisabled(true);
        const { page, size, queryFiled } = params && params

        const object = {
            page: page ? page : 1,
            size: size ? size : 10,
            queryFiled: queryFiled ? queryFiled : null
        }

        getAllStaffInfo(object).then((data) => {
            if (data.list) {
                setLoading(false);
                setStaffInfo(data.list);
                setTotalPages(data.total);
                setAddDisabled(false);
                if (msgSuccess) {
                    message.success(msgSuccess);
                }
            } else {
                setLoading(false);
                setStaffInfo([]);
                setTotalPages(0);
                setAddDisabled(false);
                message.error("加载失败！");
            }
        }).catch((err) => {
            console.log(err);
        })

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

    return (
        <Fragment>
            <Form onSubmit={handleModifySubmit} {...formItemLayout}>

                <FormItem label="员工姓名："  >
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: '姓名不能为空!' }],
                        initialValue: userName
                    })(
                        <Input disabled maxLength={20} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入姓名" />
                    )}
                </FormItem>

                <FormItem label="性别" >
                    {getFieldDecorator('sex', {
                        rules: [{ required: true, message: '性别不能为空!' }],
                        initialValue: sex
                    })(
                        <Input disabled prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} />
                    )}
                </FormItem>

                <FormItem label="联系电话：" >
                    {getFieldDecorator('telNumber', {
                        rules: [
                            { required: true, message: '电话不能为空!' },
                        ],
                        initialValue: telNumber
                    })(
                        <Input disabled prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入联系电话" />
                    )}
                </FormItem>

                <FormItem label="电子邮件" >
                    {getFieldDecorator('email', {
                        rules: [
                            { required: true, message: '电子邮件不能为空!' },
                        ],
                        initialValue: email
                    })(
                        <Input disabled prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入电子邮件" />
                    )}
                </FormItem>

                <FormItem label="联系地址" >
                    {getFieldDecorator('address', {
                        initialValue: address,
                        rules: [{ required: true, message: '地址不能为空!' }],
                    })(
                        <Input disabled prefix={<Icon type="home" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入联系地址" />
                    )}
                </FormItem>

                <FormItem label="身份证号：" >
                    {getFieldDecorator('Id_Card', {
                        initialValue: Id_Card,
                        rules: [
                            { required: true, message: '身份证号码不能为空!' },
                        ],
                    })(
                        <Input disabled prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入身份证号码" />
                    )}
                </FormItem>

                <FormItem label="部门：" >
                    {getFieldDecorator('departmentId', {
                        initialValue: departmentId,
                        rules: [{ required: true, message: '部门不能为空!' }, { pattern: /^[^ ]+$/, message: '不允许空格字符' }],
                    })(
                        <Select placeholder="请选择部门"
                            allowClear
                            showSearch
                            disabled={permissions === "1"}
                            filterOption={(input, option) =>
                                option.props.children.indexOf(input) >= 0
                            }
                        >
                            {renderAllDeps()}
                        </Select>
                    )}
                </FormItem>

                <FormItem label="职业：" >
                    {getFieldDecorator('professionalId', {
                        initialValue: professionalId,
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

                <FormItem label="职位：" >
                    {getFieldDecorator('positionId', {
                        initialValue: positionId,
                        rules: [{ required: true, message: '职位不能为空!' }, { pattern: /^[^ ]+$/, message: '不允许空格字符' }],
                    })(
                        <AllPostionSelect />
                    )}
                </FormItem>

                <Button type="primary" htmlType="submit" loading={btnLoading}>
                    确认入录
                </Button>
            </Form>
        </Fragment>
    )
})

const ModifyFormWrapper = Form.create()(ModifyForm);
export default ModifyFormWrapper;