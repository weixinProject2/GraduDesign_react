import React from 'react';
import { observer } from 'mobx-react-lite';
import { Form, Input, Icon, Button } from 'antd';
import { useJobStore } from '../../stores';
import "./index.less";
import DatePick from '../../../../tool-components/DatePick';

const { TextArea } = Input;

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

const addForm = observer(({ form }) => {
  const { getFieldDecorator } = form;

  const {
    projectId, mainStore,
  } = useJobStore;

  function handleCreateSubmit(e) {
    e.preventDefault();
    form.validateFields((err, value) => {
      if (!err) {
        value.projectId = projectId;
        const createTime = value.time ? value.time[0].format('YYYY-MM-DD') : null;
        const endTime = value.time ? value.time[1].format('YYYY-MM-DD') : null;
        value.createTime = createTime;
        value.endTime = endTime;

      }
    })
  }

  return <Form onSubmit={handleCreateSubmit} {...formItemLayout}>
    <FormItem label="员工姓名：" hasFeedback >
      {getFieldDecorator('sprintName', {
        rules: [{ required: true, message: '冲刺名称不能为空!' }],
      })(
        <Input maxLength={15} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入冲刺名称" />
      )}
    </FormItem>

    <FormItem label="冲刺目标：" hasFeedback>
      {getFieldDecorator('sprintDesc', {
        rules: [{ required: true, message: '冲刺目标不能为空!' }],
      })(
        <TextArea placeholder="请输入此次冲刺目标" />
      )}
    </FormItem>

    <FormItem label="冲刺日期：" hasFeedback>
      {getFieldDecorator('time', {
        rules: [{ required: true, message: '请选择日期' }],
      })(
        <DatePick />
      )}
    </FormItem>

    <FormItem>
      <Button
        type="primary" htmlType="submit"
      >
        创建
      </Button>
    </FormItem>
  </Form>
})

const WrappedForm = Form.create()(addForm);
export default WrappedForm;