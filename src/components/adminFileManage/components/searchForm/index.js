import React, { useEffect } from 'react';

import { Form, Button, Input, Select } from 'antd';
import { observer } from 'mobx-react-lite';
import { useFileStore } from '../../stores';
import DatePick from '../../../../tool-components/DatePick';

const FormItem = Form.Item;
const { Option } = Select;

const allFileCheck = [
    {
        name: '公开文件',
        id: '1',
    },
    {
        name: '私有文件',
        id: '0',
    }
]

const fileType = ['gif', 'zip', 'rar', 'pdf', 'jpg', 'png', 'pptx', 'doc', 'docx', 'txt', 'md', 'xls', 'unKnown']

const SearchForm = observer(({ form }) => {
    const { getFieldDecorator, getFieldsValue } = form;
    const { mainStore: {
        setCurrentPage, setQueryFileds, loadInfo, getBtnDisabled,
    } } = useFileStore();

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

    // 渲染文件查询范围
    function renderAllFileChecked() {
        return allFileCheck.map((value, key) => {
            return <Option value={value.id} key={key}>{value.name}</Option>
        })
    }

    // 渲染文件类型
    function renderAllFileType() {
        return fileType.map((value, key) => {
            return <Option value={value} key={key}>{value}</Option>
        })
    }

    return (
        <Form onSubmit={handleSearchSubmit} layout="inline" style={{ marginBottom: '.15rem' }}>
            <FormItem  >
                {getFieldDecorator('filename', {
                    rules: [{ required: false }],
                })(
                    <Input placeholder="文件名" disabled={getBtnDisabled} />
                )}
            </FormItem>

            <FormItem  >
                {getFieldDecorator('time', {
                    rules: [{ required: false }],
                })(
                    <DatePick disabled={getBtnDisabled} />
                )}
            </FormItem>

            <FormItem  >
                {getFieldDecorator('isPublic', {
                    rules: [{ required: false }],
                })(
                    <Select
                        placeholder="文件访问范围"
                        style={{ width: 180 }}
                        allowClear
                        showSearch
                        disabled={getBtnDisabled}
                        filterOption={(input, option) =>
                            option.props.children.indexOf(input) >= 0
                        }
                    >
                        {renderAllFileChecked()}
                    </Select>
                )}
            </FormItem>

            <FormItem  >
                {getFieldDecorator('kinds', {
                    rules: [{ required: false }],
                })(
                    <Select
                        placeholder="文件类型"
                        style={{ width: 180 }}
                        allowClear
                        showSearch
                        disabled={getBtnDisabled}
                        filterOption={(input, option) =>
                            option.props.children.indexOf(input) >= 0
                        }
                    >
                        {renderAllFileType()}
                    </Select>
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