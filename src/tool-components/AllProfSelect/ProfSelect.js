import React, { Fragment, useEffect } from 'react';
import { Select, message, Spin } from 'antd';
import { observer } from 'mobx-react-lite';
import { useSelectStore } from './stores'
import { getProfessional } from '../../api'

const { Option } = Select;
export default observer(() => {
    const {
        mainStore: {
            getAllProfs,
            setProfs,
            getLoading,
            setLoading
        },
        ...props
    } = useSelectStore();

    // 渲染所有职位
    function renderAllProfs() {
        return getAllProfs.map((value, key) => {
            return <Option value={value.professionalId} key={key}>{value.professionalName}</Option>
        })
    }

    function loadProfs() {
        setLoading(true);
        getProfessional().then(async (res) => {
            if (!res.error) {
                setLoading(false);
                setProfs(res.data);
            } else {
                message.error(res.message);
            }
        })
    }

    useEffect(() => {
      loadProfs();
    }, [])

    return (
        <Fragment>
            {
                getAllProfs.length > 0 ? <Select
                    placeholder="职业"
                    style={{ width: 180 }}
                    allowClear
                    showSearch
                    loading={getLoading}
                    filterOption={(input, option) =>
                        option.props.children.indexOf(input) >= 0
                    }
                    {...props}
                >
                    {renderAllProfs()}
                </Select> : <Spin size="small" />
            }
        </Fragment>
    )
})