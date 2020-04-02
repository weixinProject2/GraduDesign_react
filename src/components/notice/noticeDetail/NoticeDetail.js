import React, { Fragment, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import TableHeader from '../../../tool-components/TableHeader';
import history from '../../../utils/history'
import { getNoticeDetail } from '../../../api';
import { message } from 'antd';

export default observer(() => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [createTime, setTime] = useState('');


    function checkHasId() {
        const {
            location: {
                search,
            }
        } = history;
        if (search.indexOf('noticeId') !== -1) {
            const noticeId = search.split("=")[1];
            getNoticeDetail({ anmountId: noticeId }).then((res) => {
                if (!res.error) {
                    const { content, title, createTime } = res.data;
                    setContent(content);
                    setTitle(title);
                    setTime(createTime);
                }
            })
        } else {
            history.push('/main/notice');
        }
    }

    useEffect(() => {
        checkHasId();
    }, [])

    return (
        <Fragment>
            <TableHeader hasBack />
            <div className="gradu-form-content gradu-notice-detail">
                <h1>{title}</h1>
                <p>{createTime}</p>
                <div className="gradu-notice-detail-content" dangerouslySetInnerHTML={{ __html: content }} />
            </div>
        </Fragment>
    )
})