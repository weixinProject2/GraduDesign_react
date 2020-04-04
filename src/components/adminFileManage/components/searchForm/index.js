import React, { useEffect } from 'react';

import { Form, Button, Input } from 'antd';
import { observer } from 'mobx-react-lite';
import { useFileStore } from '../../stores';
import DatePick from '../../../../tool-components/DatePick';

const FormItem = Form.Item;

const SearchForm = observer(({ form }) => {
    const { getFieldDecorator, getFieldsValue } = form;
    const { mainStore } = useFileStore();

    useEffect(() => {

    }, [])

    function handleSearchSubmit(e) {
        e.preventDefault();
        form.validateFields((error, value) => {
            if (!error) {
                // setCurrentPage(1);
                // setQueryFileds(value);
                // loadInfo();
            }
        })
    }

    function resetFields() {
        form.resetFields();
        // setCurrentPage(1);
        // setQueryFileds(null);
        // loadInfo()
    }

    function hasData(fieldsValues) {
        return Object.keys(fieldsValues).some(field => fieldsValues[field]);
    }

    return (
        <Form onSubmit={handleSearchSubmit} layout="inline" style={{ marginBottom: '.15rem' }}>
            <FormItem  >
                {getFieldDecorator('isPublic', {
                    rules: [{ required: false }],
                })(
                    <Input maxLength={10} placeholder="文件查看范围" />
                    //   disabled={getBtnDisabled}
                )}
            </FormItem>

            <FormItem  >
                {getFieldDecorator('createDate', {
                    rules: [{ required: false }],
                })(
                    <DatePick />
                )}
            </FormItem>

            <FormItem  >
                {getFieldDecorator('fileType', {
                    rules: [{ required: false }],
                })(
                    <Input maxLength={10} placeholder="文件类型" />
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