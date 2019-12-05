import React, { useContext, useEffect, Fragment, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Form, Button, Input, Icon, message, InputNumber } from 'antd';
import { MyDeptsContext } from './stores';
import { getAllDeptsInfo } from '../../api';

const FormItem = Form.Item;
const defaultParams = {
    size: 10,
    page: 1,
    queryparams: {
        departmentName: null,
        departmentId: null,
        departmentMangerName: null,
    }
};

const SearchForm = observer(({ form }) => {
    const { getFieldDecorator, getFieldsValue } = form;
    const {
        TableAttrStore: {
            getBtnDisabled, setSearchParams, getSearchParams, setTableLoading, setBtnDisabled, setTotalPage, setTableData,
            setQueryParams, setCurrentPage,
        }
    } = useContext(MyDeptsContext);

    function resetFields() {
        form.resetFields();
        setSearchParams(defaultParams);
        loadDeptsInfo();
    }

    function loadDeptsInfo(defaultParams) {
        let searchParams = defaultParams ? defaultParams : getSearchParams;
        setTableLoading(true);
        setBtnDisabled(true);
        getAllDeptsInfo(searchParams).then((res) => {
            if (!res.error && res.data) {
                setTotalPage(res.total);
                setTableData(res.data);
                setTableLoading(false);
                setBtnDisabled(false);
            } else {
                message.error('加载失败');
                setTableLoading(false);
                setBtnDisabled(false);
                setTableData([]);
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    //判断是否有值
    function hasData(fieldsValues) {
        return Object.keys(fieldsValues).some(field => fieldsValues[field]);
    }

    function handleSearchSubmit(e) {
        e.preventDefault();
        form.validateFields((err, values) => {
            if (!err) {
                setQueryParams(values);
                setCurrentPage(1);
                loadDeptsInfo();
            }
        });
    }
    return (
        <Fragment>
            <Form onSubmit={handleSearchSubmit} layout="inline" style={{ marginBottom: '.15rem' }}>
                <FormItem  >
                    {getFieldDecorator('departmentName', {
                        rules: [{ required: false }],
                    })(
                        <Input maxLength={20} placeholder="部门名称" disabled={getBtnDisabled} />
                    )}
                </FormItem>

                <FormItem  >
                    {getFieldDecorator('departmentId', {
                        rules: [{ required: false }],
                    })(
                        <InputNumber maxLength={6} placeholder="部门编号" disabled={getBtnDisabled} />
                    )}
                </FormItem>

                <FormItem >
                    {getFieldDecorator('departmentMangerName', {
                        rules: [{ required: false }],
                    })(
                        <Input maxLength={20} placeholder="部门管理员名称" disabled={getBtnDisabled} />
                    )}
                </FormItem>

                <FormItem>
                    <Button type="primary" icon='search' htmlType="submit" ghost >
                        搜索
                    </Button>
                    <Button onClick={resetFields} type="danger" ghost style={{ marginLeft: '.1rem' }} disabled={!hasData(getFieldsValue())}>
                        清空
                    </Button>
                </FormItem>
            </Form>
        </Fragment>
    )
})

const WrappedNormalSearchForm = Form.create()(SearchForm);
export default WrappedNormalSearchForm;