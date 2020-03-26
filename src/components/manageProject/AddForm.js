import React, { useState } from 'react';
import { Form, Input, Icon, Button, message, InputNumber } from 'antd';
import { useProjectStore } from "./stores";
import { observer } from 'mobx-react-lite';
import { addNewProject } from '../../api';
import DeptSelect from '../../tool-components/AllDeptSelect';

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


const AddForm = observer(({ form }) => {
    const { getFieldDecorator } = form;
    const [addBtnLoading, setBtnLoading] = useState(false);

    const {
        mainStore: {
            setAddModalVisble, setQueryFileds, setCurrentPage, loadInfo,
        }
    } = useProjectStore();

    function handleAddProjects(e) {
        e.preventDefault();
        form.validateFields((err, values) => {
            if (!err) {
                setBtnLoading(true);
                addNewProject(values).then((res) => {
                    if (!res.error) {
                        setQueryFileds(null);
                        setCurrentPage(1);
                        setBtnLoading(false);
                        setAddModalVisble(false);
                        message.success(res.message);
                        loadInfo();
                    } else if (res.error === -2) {
                        setBtnLoading(false);
                        form.setFields({
                            bToDepartmentAdminID: {
                                errors: [new Error(res.message)],
                            }
                        })
                    } else {
                        setBtnLoading(false);
                        message.error(res.message);
                    }
                })
            }
        })
    }

    return (
        <Form {...formItemLayout} onSubmit={handleAddProjects}>
            <FormItem label="项目名称：" >
                {getFieldDecorator('projectName', {
                    rules: [{ required: true, message: '项目名称不能为空!' }, { pattern: /^[^ ]+$/, message: '不允许空格字符' }],
                })(
                    <Input maxLength={20} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入项目名称" />
                )}
            </FormItem>

            <FormItem label="项目简介：" >
                {getFieldDecorator('describe', {
                    rules: [{ required: true, message: '项目简介不能为空!' }],
                })(
                    <Input maxLength={20} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入项目简介" />
                )}
            </FormItem>

            <FormItem label="分配部门：" >
                {getFieldDecorator('bToDepartmentID', {
                    rules: [{ required: false }],
                })(
                    <DeptSelect />
                )}
            </FormItem>

            <Button type="primary" htmlType="submit" loading={addBtnLoading}>
                确认添加
            </Button>
        </Form>
    )
})

const WrappedNormalAddForm = Form.create()(AddForm);
export default WrappedNormalAddForm;