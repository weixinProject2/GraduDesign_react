import React, { Fragment, useEffect } from 'react';
import { Select, message, Spin } from 'antd';
import { observer } from 'mobx-react-lite';
import { useSelectStore } from './stores'
import { getPosition } from '../../api'

const { Option } = Select;
export default observer(() => {
    const {
        mainStore: {
            getAllPos,
            setPosition,
            getLoading,
            setLoading
        },
        ...props
    } = useSelectStore();

    // 渲染所有职位
    function renderAllPos() {
        return getAllPos.map((value, key) => {
            return <Option value={value.positionId} key={key}>{value.positionName}</Option>
        })
    }

    function loadPostion() {
        setLoading(true);
        getPosition().then(async (res) => {
            if (!res.error) {
                setLoading(false);
                setPosition(res.data);
            } else {
                message.error(res.message);
            }
        })
    }

    useEffect(() => {
        loadPostion();
    }, [])

    return (
        <Fragment>
            {
                getAllPos.length > 0 ? <Select
                    placeholder="职位"
                    style={{ width: 180 }}
                    allowClear
                    showSearch
                    loading={getLoading}
                    filterOption={(input, option) =>
                        option.props.children.indexOf(input) >= 0
                    }
                    {...props}
                >
                    {renderAllPos()}
                </Select> : <Spin size="small" />
            }
        </Fragment>
    )
})