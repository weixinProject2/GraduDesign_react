import React, { Fragment } from 'react';
import { observer } from 'mobx-react-lite';
import { Form, Button, Input } from 'antd';
import { useDeptProjectsStore } from '../../stores'
import AllProfSelect from '../../../../tool-components/AllProfSelect'
import AllPostionSelect from '../../../../tool-components/AllPostionSelect';

const FormItem = Form.Item;

const SearchForm = observer(({ form }) => {
  const { getFieldDecorator, getFieldsValue } = form;
  const {
    mainStore,
    projectId,
  } = useDeptProjectsStore();

  const { setQueryFiled, loadInfo, setCurrentPage, getBtnDisabled } = mainStore;

  function handleSearchSubmit(e) {
    e.preventDefault();
    form.validateFields((error, value) => {
      if (!error) {
        setCurrentPage(1);
        setQueryFiled(value);
        loadInfo(projectId);
      }
    })
  }
  //判断是否有值
  function hasData(fieldsValues) {
    return Object.keys(fieldsValues).some(field => fieldsValues[field]);
  }

  function resetFields() {
    form.resetFields();
    setCurrentPage(1);
    setQueryFiled(null);
    loadInfo(projectId)
  }
  return (
    <Fragment>
      <Form onSubmit={handleSearchSubmit} layout="inline" style={{ marginBottom: '.15rem' }}>
        <FormItem  >
          {getFieldDecorator('userName', {
            rules: [{ required: false }],
          })(
            <Input maxLength={20} placeholder="姓名" disabled={getBtnDisabled} />
          )}
        </FormItem>

        <FormItem  >
          {getFieldDecorator('workNumber', {
            rules: [{ required: false }],
          })(
            <Input maxLength={6} placeholder="工号" disabled={getBtnDisabled} />
          )}
        </FormItem>

        <FormItem >
          {getFieldDecorator('professionalId', {
            rules: [{ required: false }],
          })(
            <AllProfSelect disabled={getBtnDisabled} />
          )}
        </FormItem>
        
        <FormItem>
          <Button type="primary" icon='search' htmlType="submit" ghost disabled={!hasData(getFieldsValue())} >
            搜索
                    </Button>
          <Button onClick={resetFields} type="danger" ghost style={{ marginLeft: '.1rem' }} >
            重置
                    </Button>
        </FormItem>
      </Form>
    </Fragment>
  )
})

const WrapSearchForm = Form.create()(SearchForm);
export default WrapSearchForm;