import React from 'react';

import Editor from 'for-editor';
import { observer } from 'mobx-react-lite';

import "./index.less"

const toolbar = {
  h1: true, // h1
  h2: true, // h2
  h3: true, // h3
  h4: true, // h4
  img: true, // 图片
  link: true, // 链接
  code: true, // 代码块
  preview: true, // 预览
  expand: false, // 全屏
  /* v0.0.9 */
  undo: true, // 撤销
  redo: true, // 重做
  save: true, // 保存
  /* v0.2.3 */
  subfield: true, // 单双栏模式
}

const style = {
  boxShadow: 'none',
  maxHeight: '520px'
}

export default observer((props) => {
  const {
    value,
    onChange,
    onSave,
    placeholder,
    addImg,
  } = props;
  return (
    <Editor
      placeholder={placeholder}
      onSave={onSave}
      onChange={onChange}
      value={value}
      style={style}
      toolbar={toolbar}
      addImg={addImg}
    />
  )
})

// https://gitee.com/mirrors/for-editor