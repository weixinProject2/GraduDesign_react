import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { addNewPos } from '../../api';
import { Form, Input, Icon, Button, message } from 'antd';
import { usePositionsStore } from './stores';

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
    const { getFieldDecorator, validateFields } = form;
    const [addBtnLoading, setBtnLoading] = useState(false);
    const {
        mainStore: {
            setPosAddModalVisble,
            loadInfo,
        }
    } = usePositionsStore();

    function handleAddDept(e) {
        e.preventDefault();
        form.validateFields((err, values) => {
            if (!err) {
                setBtnLoading(true);
                addNewPos(values).then((res) => {
                    if (!res.error) {
                        setPosAddModalVisble(false);
                        loadInfo();
                        message.success(res.message);
                    } else if (res.error === -3) {
                        setBtnLoading(false);
                        form.setFields({
                            positionName: {
                                errors: [new Error(res.message)],
                            }
                        })
                    } else {

                    }
                })
            }
        })
    }

    return (
        <Form {...formItemLayout} onSubmit={handleAddDept}>
            <FormItem label="职位名称：" >
                {getFieldDecorator('positionName', {
                    rules: [{ required: true, message: '职位名称不能为空!' }, { pattern: /^[^ ]+$/, message: '不允许空格字符' }],
                })(
                    <Input maxLength={20} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入职位名称" />
                )}
            </FormItem>

            <FormItem label="职位简介：" >
                {getFieldDecorator('description', {
                    rules: [{ required: true, message: '职位简介不能为空!' }],
                })(
                    <Input maxLength={20} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入职位简介" />
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