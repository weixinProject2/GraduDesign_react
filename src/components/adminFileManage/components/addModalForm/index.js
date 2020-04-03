import React, { forwardRef, useImperativeHandle, useState } from 'react';

import { Button, Modal, Input, Radio, Upload, Icon, message } from 'antd';
import Form from "antd/lib/form/Form";


const formItemLayout = {
    labelCol: {
        sm: { span: 8 },
    },
    wrapperCol: {
        sm: { span: 12 },
    },
};

const addModalForm = forwardRef(({ form, onCreate, visible, onCancel, confirmLoading }, ref) => {
    const { getFieldDecorator } = form;
    const [fileLists, setFile] = useState(null);
    useImperativeHandle(ref, () => ({
        form,
    }));

    function normFile(e) {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    }

    function handleChange(info) {
        let fileList = [...info.fileList];
        fileList = fileList.slice(-1);
        fileList = fileList.map(file => {
            if (file.response) {
                file.url = file.response.url;
            }
            return file;
        });
        setFile(fileList);
    }

    function removeFile(file) {
        const temp = fileLists.filter(item => item.name !== file.name);
        setFile(temp);
        form.setFieldsValue({ 'fieldLists': temp });
    }

    const uploadProps = {
        accept: ".rar,.zip,.doc,.docx,.pdf,.jpg,.png,.md,.gif,.xls,.txt",
        multiple: false,
        name: 'file',
        beforeUpload(file) {
            const isLt10M = file.size / 1024 / 1024 <= 10;
            if (!isLt10M) {
                message.error("文件大小限制在10M以下！");
                return false;
            }
            return false;
        },
        onChange: handleChange,
        onRemove: removeFile,
        fileList: fileLists
    }

    return (
        <Modal
            title="上传新文件"
            okText="上传"
            cancelText="取消"
            visible={visible}
            onCancel={onCancel}
            onOk={onCreate}
            confirmLoading={confirmLoading}
            destroyOnClose={true}
        >
            <Form {...formItemLayout}>
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
                        <Upload {...uploadProps}>
                            <Button>
                                <Icon type="upload" /> 上传
                            </Button>
                            <p className="gradu-upload-desc">支持扩展名：.rar .zip .doc .docx .gif .md .pdf .jpg .png .txt .ppt .xls</p>
                        </Upload>
                    )}
                </Form.Item>
            </Form>
        </Modal>
    )

})

const FileCreateForm = Form.create({ name: 'form_in_modal' })(addModalForm);


export default FileCreateForm;