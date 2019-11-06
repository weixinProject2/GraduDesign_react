import React, { useContext, useEffect, Fragment, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Form, Button, Input, Icon, Select, message } from 'antd';
import { getAllStaffInfo, getDepartment } from '../../api';
import { MyStaffContext } from './stores';

const FormItem = Form.Item;
const { Option } = Select

const SearchForm = observer(({ form }) => {
    const { getFieldDecorator, getFieldsValue } = form;

    const {
        TableAttrStore: {
            getAllDeptsOpts, getAllPf, getAllPos,
            setLoading, setAddDisabled, setStaffInfo, setTotalPages, getPage, getAddDisabled,
            setQueryFields, getQueryFields, setDeptsOpts,setPage
        }
    } = useContext(MyStaffContext);

    useEffect(() => {
        // console.log(getFieldsValue())
    }, [])

    // 提交
    function handleSearchSubmit(e) {
        if (e.preventDefault) {
            e.preventDefault();
        }
        form.validateFields((err, values) => {
            if (!err) {
                setQueryFields(values);
                setPage(1);
                const params = {
                    page: 1,
                    size: 10,
                    queryFiled: values,
                };
                loadStaffInfo(params)
            }
        })
    }

    // 获取所有部门放到select框中
    function renderAllDeps() {
        return getAllDeptsOpts.map((value, key) => {
            return <Option value={value.departmentId} key={key}>{value.departmentName}</Option>
        })
    }

    // 渲染所有职业
    function renderAllProf() {
        return getAllPf.map((value, key) => {
            return <Option value={value.professionalId} key={key}>{value.professionalName}</Option>
        })
    }

    // 渲染所有职位
    function renderAllPos() {
        return getAllPos.map((value, key) => {
            return <Option value={value.positionId} key={key}>{value.positionName}</Option>
        })
    }

    // 清空搜索
    function resetFields() {
        form.resetFields();
        setQueryFields(null);
        const params = {
            page: 1,
            size: 10,
        };
        loadStaffInfo(params)
    }

    //判断是否有值
    function hasData(fieldsValues) {
        return Object.keys(fieldsValues).some(field => fieldsValues[field]);
    }

    // 加载数据
    function loadStaffInfo(params, msgSuccess) {
        setLoading(true);
        const { page, size, queryFiled } = params && params

        const object = {
            page: page ? page : 1,
            size: size ? size : 10,
            queryFiled: queryFiled ? queryFiled : null
        }

        getAllStaffInfo(object).then((data) => {
            setAddDisabled(true);
            if (data.list) {
                setTimeout(() => {
                    setLoading(false);
                    setStaffInfo(data.list);
                    setTotalPages(data.total);
                    setAddDisabled(false)
                    if (msgSuccess) {
                        message.success(msgSuccess);
                    }
                }, 500);
            } else {
                setTimeout(() => {
                    setLoading(false);
                    setStaffInfo([]);
                    setTotalPages(0);
                    setAddDisabled(false)
                    message.error("加载失败！");
                }, 500);
            }
        }).catch((err) => {
            console.log(err);
        })

    }

    return (
        <Fragment>
            <Form onSubmit={handleSearchSubmit} layout="inline" style={{ marginBottom: '.15rem' }}>
                <FormItem  >
                    {getFieldDecorator('userName', {
                        rules: [{ required: false }],
                    })(
                        <Input maxLength={20} placeholder="姓名" disabled={getAddDisabled} />
                    )}
                </FormItem>

                <FormItem  >
                    {getFieldDecorator('workNumber', {
                        rules: [{ required: false }],
                    })(
                        <Input maxLength={6} placeholder="工号" disabled={getAddDisabled} />
                    )}
                </FormItem>

                <FormItem >
                    {getFieldDecorator('departmentId', {
                        rules: [{ required: false }],
                    })(
                        <Select
                            placeholder="部门"
                            style={{ width: 180 }}
                            disabled={getAddDisabled}
                            allowClear
                            showSearch
                            filterOption={(input, option) =>
                                // console.log(input, option)
                                option.props.children.indexOf(input) >= 0
                            }
                        >
                            {renderAllDeps()}
                        </Select>
                    )}
                </FormItem>

                <FormItem >
                    {getFieldDecorator('professionalId', {
                        rules: [{ required: false }],
                    })(
                        <Select
                            placeholder="职业"
                            style={{ width: 180 }}
                            disabled={getAddDisabled}
                            showSearch
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
                            disabled={getAddDisabled}
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
                    <Button onClick={resetFields} type="danger" ghost style={{ marginLeft: '.1rem' }} disabled={!hasData(getFieldsValue())}>
                        清空
                    </Button>
                </FormItem>
            </Form>
        </Fragment>
    )
});



const WrappedNormalSearchForm = Form.create()(SearchForm);
export default WrappedNormalSearchForm;



