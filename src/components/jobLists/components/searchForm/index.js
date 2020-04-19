import React, { useEffect } from 'react';

import { Form, Button, Input } from 'antd';
import { observer } from 'mobx-react-lite';
import { useJobStore } from '../../stores';
import AllJobStatusSelect from '../../../../tool-components/AllJobStatusSelect';
import JobTypeSelect from '../../../../tool-components/AlljobTypeSelect';

const FormItem = Form.Item;

const SearchForm = observer(({ form }) => {
  const { getFieldDecorator, getFieldsValue } = form;
  const {
    mainStore: {
      setCurrentPage, setQueryFileds, loadTableData, tableBtnDiabled,
    },
    projectId,
  } = useJobStore();

  useEffect(() => {

  }, [])

  function handleSearchSubmit(e) {
    e.preventDefault();
    form.validateFields((error, value) => {
      if (!error) {
        console.log(value);
        // const startTime = value.time ? value.time[0].format('YYYY-MM-DD HH:mm:ss') : null;
        // const endTime = value.time ? value.time[1].format('YYYY-MM-DD HH:mm:ss') : null;
        // value.endTime = endTime;
        // value.startTime = startTime;
        // setCurrentPage(1);
        // setQueryFileds(value);
        // loadInfo();
      }
    })
  }

  function resetFields() {
    form.resetFields();
    setCurrentPage(1);
    setQueryFileds(null);
    loadTableData(projectId);
  }

  function hasData(fieldsValues) {
    return Object.keys(fieldsValues).some(field => fieldsValues[field]);
  }

  return (
    <Form onSubmit={handleSearchSubmit} layout="inline" style={{ marginBottom: '.15rem' }}>
      <FormItem  >
        {getFieldDecorator('problemName', {
          rules: [{ required: false }],
        })(
          <Input placeholder="问题名" disabled={tableBtnDiabled} />
        )}
      </FormItem>

      <FormItem  >
        {getFieldDecorator('kinds', {
          rules: [{ required: false }],
        })(
          <JobTypeSelect disabled={tableBtnDiabled} />
        )}
      </FormItem>

      <FormItem  >
        {getFieldDecorator('status', {
          rules: [{ required: false }],
        })(
          <AllJobStatusSelect disabled={tableBtnDiabled} />
        )}
      </FormItem>

      <FormItem  >
        {getFieldDecorator('sprintId', {
          rules: [{ required: false }],
        })(
          <Input placeholder="所在冲刺" />
        )}
      </FormItem>


      <FormItem>
        <Button type="primary" icon='search' htmlType="submit" ghost disabled={!hasData(getFieldsValue())}>
          搜索
                </Button>
        <Button onClick={resetFields} type="danger" ghost style={{ marginLeft: '.1rem' }} >
          重置
                </Button>
      </FormItem>
    </Form>
  )
})

const WrapSearchForm = Form.create()(SearchForm);
export default WrapSearchForm;