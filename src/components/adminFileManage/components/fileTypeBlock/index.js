import React from 'react';
import "./index.less";
import { Icon } from 'antd';
import PropTypes from 'prop-types';

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

const fileTypeBlock = ({ fileType }) => {

  return (
    <div className="gradu-file-block">
      <main>
        <Icon
          type={fileTypeObj[fileType] ? fileTypeObj[fileType].icon : 'file-unknown'}
          theme="twoTone"
          twoToneColor={fileTypeObj[fileType] ? fileTypeObj[fileType].color: "#666"}
        />
      </main>
      <footer>
        <span>hello world hello world hello world</span>
        <span>2019-10-20</span>
      </footer>
    </div>
  )
};
fileTypeBlock.propTypes = {
  fileType: PropTypes.string.isRequired,
};

fileTypeBlock.defaultProps = {
  fileType: 'file-unknown',
};

export default fileTypeBlock;