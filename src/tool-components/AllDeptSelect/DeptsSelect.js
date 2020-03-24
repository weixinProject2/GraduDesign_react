import React, { Fragment, useEffect } from 'react';
import { Select, message, Spin } from 'antd';
import { observer } from 'mobx-react-lite';
import { useSelectStore } from './stores'
import { getDepartment } from '../../api'

const { Option } = Select;
export default observer(() => {
    const {
        mainStore: {
            getAllDepts,
            setDepts,
            getLoading,
            setLoading
        },
        ...props
    } = useSelectStore();

    // 渲染所有职位
    function renderAllDepts() {
        return getAllDepts.map((value, key) => {
            return <Option value={value.departmentId} key={key}>{value.departmentName}</Option>
        })
    }

    function loadDepts() {
        setLoading(true);
        getDepartment().then(async (res) => {
            if (!res.error) {
                setLoading(false);
                setDepts(res.data);
            } else {
                message.error(res.message);
            }
        })
    }

    useEffect(() => {
      loadDepts();
    }, [])

    return (
        <Fragment>
            {
                getAllDepts.length > 0 ? <Select
                    placeholder="部门"
                    style={{ width: 180 }}
                    allowClear
                    showSearch
                    loading={getLoading}
                    filterOption={(input, option) =>
                        option.props.children.indexOf(input) >= 0
                    }
                    {...props}
                >
                    {renderAllDepts()}
                </Select> : <Spin size="small" />
            }
        </Fragment>
    )
})