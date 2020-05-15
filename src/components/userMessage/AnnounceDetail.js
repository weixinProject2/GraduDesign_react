import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useMessageStore } from './stores';
import { getNoticeDetail } from '../../api';

export default observer(() => {
  const {
    mainStore,
  } = useMessageStore();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [createTime, setTime] = useState('');

  const {
    announceId
  } = mainStore;

  useEffect(() => {
    getNoticeDetail({ anmountId: announceId }).then((res) => {
      if (!res.error) {
        const { content, title, createTime } = res.data;
        setContent(content);
        setTitle(title);
        setTime(createTime);
      }
    })
  }, [announceId]);

  return (
    <div className="gradu-form-content gradu-notice-detail">
      <h1>{title}</h1>
      <p>{createTime}</p>
      <div
        style={{ width: '100%' }}
        className="gradu-notice-detail-content" dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
})