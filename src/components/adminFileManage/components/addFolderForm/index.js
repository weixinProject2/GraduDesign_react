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

const addModalForm = forwardRef(({ form, onCreate, visible, onCancel }, ref) => {
  const { getFieldDecorator } = form;

  useImperativeHandle(ref, () => ({
    form,
  }));

  return (
    <Modal
      title="新增文件夹"
      okText="创建"
      cancelText="取消"
      visible={visible}
      onCancel={onCancel}
      onOk={onCreate}
      // confirmLoading={confirmLoading}
      destroyOnClose={true}
    >
      <Form {...formItemLayout}>
        <Form.Item label="文件名">
          {getFieldDecorator('folderName', {
            rules: [{ required: true, message: '请输入文件名' }],
          })(
            <Input />,
          )}
        </Form.Item>
      </Form>
    </Modal>
  )

})

const FileCreateForm = Form.create({ name: 'form_in_modal_addFolder' })(addModalForm);


export default FileCreateForm;