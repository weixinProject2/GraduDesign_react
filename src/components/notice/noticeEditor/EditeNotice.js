import React, { Fragment, useState } from 'react';
import { observer } from 'mobx-react-lite';
import TableHeader from '../../../tool-components/TableHeader';

import { useNoticeEditorStore } from './stores'
import TitleForm from './TitleForm';

import MyEditor from '../../../tool-components/MyEditor';


export default observer(() => {
  const {
    mainStore: {
      getMarkValue,
      setMarkValue,
    }
  } = useNoticeEditorStore();


  function changeValue(value) {
    setMarkValue(value);
  }

  function addImg() {

  }

  function onSave(value) {
    setMarkValue(value);
  }

  return (
    <Fragment>
      <TableHeader hasBack />
      <div className="gradu-form-content">
        <h2>添加公告</h2>

        <TitleForm />

        <MyEditor
          value={getMarkValue}
          onChange={changeValue.bind(this)}
          onSave={onSave.bind(this)}
          placeholder='请输入公告内容.....'
          addImg={addImg}
        />
      </div>

    </Fragment>
  )
})