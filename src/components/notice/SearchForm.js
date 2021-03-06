import React, { useEffect } from 'react';

import { Form, Button, Input } from 'antd';
import { observer } from 'mobx-react-lite';
import { useNoticeStore } from './stores';
import DatePick from '../../tool-components/DatePick';

const FormItem = Form.Item;

const SearchForm = observer(({ form }) => {
    const { getFieldDecorator, getFieldsValue } = form;
    const { mainStore: { setCurrentPage, setQueryFileds, loadInfo, getBtnDisabled } } = useNoticeStore();

    useEffect(() => {

    }, [])

    function handleSearchSubmit(e) {
        e.preventDefault();
        form.validateFields((error, value) => {
            if (!error) {
                const startTime = value.time ? value.time[0].format('YYYY-MM-DD HH:mm:ss') : null;
                const endTime = value.time ? value.time[1].format('YYYY-MM-DD HH:mm:ss') : null;
                value.endTime = endTime;
                value.startTime = startTime;
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
                {getFieldDecorator('title', {
                    rules: [{ required: false }],
                })(
                    <Input placeholder="标题" disabled={getBtnDisabled} />
                )}
            </FormItem>

            <FormItem  >
                {getFieldDecorator('time', {
                    rules: [{ required: false }],
                })(
                    <DatePick disabled={getBtnDisabled} />
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