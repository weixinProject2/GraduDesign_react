import React, { useEffect } from 'react';

import { Form, Button, Input } from 'antd';
import { observer } from 'mobx-react-lite';
import AllDeptSelect from '../../tool-components/AllDeptSelect';
import { useProjectStore } from './stores';


const FormItem = Form.Item;

const SearchForm = observer(({ form }) => {
  const { getFieldDecorator, getFieldsValue } = form;
  const { mainStore: { setCurrentPage, setQueryFileds, loadInfo, getBtnDisabled } } = useProjectStore();

  useEffect(() => {

  }, [])

  function handleSearchSubmit(e) {
    e.preventDefault();
    form.validateFields((error, value) => {
      console.log(value);
      if (!error) {
        setCurrentPage(1);
        setQueryFileds(value);
        loadInfo();
      }
    })
  }

  function resetFields() {
    form.resetFields();
    setCurrentPage(1);
    setQueryFileds(null);
    loadInfo()
  }

  function hasData(fieldsValues) {
    return Object.keys(fieldsValues).some(field => fieldsValues[field]);
  }

  return (
    <Form onSubmit={handleSearchSubmit} layout="inline" style={{ marginBottom: '.15rem' }}>
      <FormItem  >
        {getFieldDecorator('projectName', {
          rules: [{ required: false }],
        })(
          <Input maxLength={10} placeholder="项目名称" disabled={getBtnDisabled} />
        )}
      </FormItem>

      <FormItem  >
        {getFieldDecorator('bToDepartmentID', {
          rules: [{ required: false }],
        })(
          <AllDeptSelect disabled={getBtnDisabled} />
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