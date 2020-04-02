import React, { forwardRef, useImperativeHandle } from 'react';

import { Button, Modal, Input, Radio, Upload, Icon } from 'antd';
import Form from "antd/lib/form/Form";


const addModalForm = forwardRef(({ form, onCreate, visible, onCancel }, ref) => {
    const { getFieldDecorator } = form;
    useImperativeHandle(ref, () => ({
        form,
    }));

    function normFile(e) {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    }

    return (
        <Modal
            title="上传新文件"
            okText="上传"
            cancelText="取消"
            visible={visible}
            onCancel={onCancel}
            onOk={onCreate}
        >
            <Form>
                <Form.Item label="文件描述">
                    {getFieldDecorator('desc', {
                        rules: [{ required: true, message: '请输入文件描述' }],
                    })(
                        <Input />
                    )}
                </Form.Item>
                <Form.Item label="是否公开">
                    {getFieldDecorator('isPublic', {
                        rules: [{ required: true, message: '请选择是否公开文件' }],
                    })(
                        <Radio.Group>
                            <Radio value="1">是</Radio>
                            <Radio value="0">否</Radio>
                        </Radio.Group>,
                    )}
                </Form.Item>
                <Form.Item label="上传文件">
                    {getFieldDecorator('file', {
                        rules: [{ required: true, message: '请选择上传的文件' }],
                    }, {
                        valuePropName: 'fileList',
                        getValueFromEvent: normFile,
                    })(
                        <Upload >
                            {/* https://blog.csdn.net/weixin_30950887/article/details/98841829 */}
                            {/* {...props} fileList={this.state.fileList} */}
                            <Button>
                                <Icon type="upload" /> Upload
                            </Button>
                        </Upload>
                    )}
                </Form.Item>
            </Form>
        </Modal>
    )

})

const FileCreateForm = Form.create({ name: 'form_in_modal' })(addModalForm);


export default FileCreateForm;