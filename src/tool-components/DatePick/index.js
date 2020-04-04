import React from 'react';

import { DatePicker } from 'antd';
import { observer } from 'mobx-react-lite';
import moment from 'moment';

const { RangePicker } = DatePicker;

const DatePick = observer((props) => (
    <RangePicker
        ranges={{
            '今天': [moment().startOf('day'), moment().endOf('day')],
            '这个月': [moment().startOf('month'), moment().endOf('month')],
            '今年': [moment().startOf('year'), moment().endOf('year')],
        }}
        showTime
        allowClear
        placeholder={['请输入开始日期', '请输入结束日期']}
        format="YYYY/MM/DD HH:mm:ss"
        {...props}
    />
))

export default DatePick