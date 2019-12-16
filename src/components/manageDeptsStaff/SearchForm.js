import React, { Fragment } from 'react';
import { observer } from 'mobx-react-lite';
import { Form, Select, Button, Input } from 'antd';

// import { useDeptsStaffStore } from './stores'

const FormItem = Form.Item;
const Option = Select.Option;
const SearchForm = observer(({ form, searchStore, mainStore }) => {
    const { getFieldDecorator, getFieldsValue } = form;
    const { getAllPos, getAllPf, } = searchStore;
    const { setQueryFiled, loadInfo, setCurrentPage, getBtnDisabled, setBtnDisabled } = mainStore;
    // 渲染所有职位
    function renderAllPos() {
        return getAllPos.map((value, key) => {
            return <Option value={value.positionId} key={key}>{value.positionName}</Option>
        })
    }
    // 渲染所有职业
    function renderAllProf() {
        return getAllPf.map((value, key) => {
            return <Option value={value.professionalId} key={key}>{value.professionalName}</Option>
        })
    }
    function handleSearchSubmit(e) {
        e.preventDefault();
        form.validateFields((error, value) => {
            if (!error) {
                setCurrentPage(1);
                setQueryFiled(value);
                loadInfo();
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
        loadInfo()
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
                        <Select
                            placeholder="职业"
                            style={{ width: 180 }}
                            showSearch
                            disabled={getBtnDisabled}
                            allowClear
                            filterOption={(input, option) =>
                                option.props.children.indexOf(input) >= 0
                            }
                        >
                            {renderAllProf()}
                        </Select>
                    )}
                </FormItem>

                <FormItem >
                    {getFieldDecorator('positionId', {
                        rules: [{ required: false }],
                    })(
                        <Select
                            placeholder="职位"
                            style={{ width: 180 }}
                            disabled={getBtnDisabled}
                            showSearch
                            allowClear
                            filterOption={(input, option) =>
                                option.props.children.indexOf(input) >= 0
                            }
                        >
                            {renderAllPos()}
                        </Select>
                    )}
                </FormItem>
                <FormItem>
                    <Button type="primary" icon='search' htmlType="submit" ghost >
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