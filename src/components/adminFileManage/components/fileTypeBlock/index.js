import React, { useState } from 'react';
import "./index.less";
import { Icon, Tooltip, Button } from 'antd';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react-lite';

const fileTypeObj = {
  'gif': {
    color: '#eb6a34',
    icon: 'file-image',
  },
  'zip': {
    color: '#eebf2c',
    icon: 'file-zip',
  },
  'pdf': {
    color: '#9e584d',
    icon: 'file-pdf',
  },
  'jpg': {
    color: '#eb6a34',
    icon: 'file-image',
  },
  'png': {
    color: '#eb6a34',
    icon: 'file-image',
  },
  'ppt': {
    color: '#e64a19',
    icon: 'file-ppt',
  },
  'doc': {
    color: '#1b85ff',
    icon: 'file-word',
  },
  'docx': {
    color: '#1b85ff',
    icon: 'file-word',
  },
  'txt': {
    color: '#949494',
    icon: 'file-text',
  },
  'md': {
    color: '#00d4a5',
    icon: 'file-markdown'
  },
  'xls': {
    color: '#4da1ff',
    icon: 'file-excel'
  },
  'unKnown': {
    color: '#666',
    icon: 'file-unknown'
  }
}

const fileTypeBlock = observer(({ fileType }) => {
  const [shadowBlock, setDisplay] = useState(true);

  return (
    <div className="gradu-file-block">
      <main>
        <Tooltip placement="top" title={'hello world hello world hello world'}>
          <Icon
            type={fileTypeObj[fileType] ? fileTypeObj[fileType].icon : 'file-unknown'}
            theme="twoTone"
            twoToneColor={fileTypeObj[fileType] ? fileTypeObj[fileType].color : "#666"}
            onClick={() => setDisplay(false)}
          />
        </Tooltip>

        <div
          className="gradu-file-opts"
          style={{ display: shadowBlock ? 'none' : 'flex' }}
        >
          <span><Icon type="read" />文件预览</span>
          <span><Icon type="download" />下载</span>
          <span><Icon type="delete" />删除</span>
          <span onClick={() => setDisplay(true)}>
            <Icon type="close" />
          </span>
        </div>
      </main>
      <footer>

        <span>hello world hello world hello world</span>
        <span>{`文件类型：.${fileType}`}</span>
        <span>上传时间：2019-10-20</span>
      </footer>
    </div>
  )
});

fileTypeBlock.propTypes = {
  fileType: PropTypes.string.isRequired,
};

fileTypeBlock.defaultProps = {
  fileType: 'file-unknown',
};

export default fileTypeBlock;