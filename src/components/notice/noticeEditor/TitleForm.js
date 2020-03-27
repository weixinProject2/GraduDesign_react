import React, { useState } from 'react';
import { Form, Input, Icon, Button, message } from 'antd';
import { observer } from 'mobx-react-lite';
import { useNoticeEditorStore } from './stores';
import Marked from 'marked';
import { newNotice } from '../../../api';
import history from '../../../utils/history';

const FormItem = Form.Item;
const formItemLayout = {
  wrapperCol: { span: 24, }
};

const TitleForm = observer(({ form }) => {
  const [hasTitle, setTitleStatus] = useState(false);
  const {
    mainStore: {
      getMarkValue,
      setNoticeTitle,
    }
  } = useNoticeEditorStore();

  const { getFieldDecorator } = form;

  function handleSubmit(e) {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        if (!getMarkValue) {
          message.info('请输入所需要发布的公告内容');
        } else {
          values.content = Marked(getMarkValue);
          newNotice(values).then((res) => {
            if (!res.error) {
              message.success(res.message);
              history.push('/main/notice');
            }
          })
        }
      }
    })
  }

  function handleValidateTitle(rule, value, callback) {
    if (value !== '') {
      setTitleStatus(true);
      setNoticeTitle(value);
      callback();
    } else {
      setTitleStatus(false);
      callback('请输入公告标题')
    }
  }

  return (
    <div style={{ width: '100%', height: '65px' }}>
      <Form onSubmit={handleSubmit} layout="inline"  {...formItemLayout} className="gradu-notice-edit-form">

        <FormItem>
          {getFieldDecorator('title', {
            rules: [
              {
                validator: handleValidateTitle,
              }
            ],
          })(
            <Input maxLength={20} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入公告标题" />
          )}
        </FormItem>

        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            disabled={!getMarkValue || !hasTitle}
          >发布公告</Button>
        </FormItem>

      </Form>
    </div>
  )
})
const NoticeTitleForm = Form.create()(TitleForm);

export default NoticeTitleForm;