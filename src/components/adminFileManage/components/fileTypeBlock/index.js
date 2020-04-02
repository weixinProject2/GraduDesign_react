import React from 'react';
import "./index.less";
import { Icon } from 'antd';
import PropTypes from 'prop-types';

const fileTypeObj = {
  'gif': {
    color: '',
    icon: 'file-image',
  },
  'zip': {
    color: '',
    icon: 'file-zip',
  },
  'pdf': {
    color: '#9e584d',
    icon: 'file-pdf',
  },
  'jpg': {
    color: '',
    icon: 'file-image',
  },
  'png': {
    color: '',
    icon: 'file-image',
  },
  'ppt': {
    color: '',
    icon: 'file-ppt',
  },
  'doc': {
    color: '',
    icon: 'file-word',
  },
  'docx': {
    color: '',
    icon: 'file-word',
  },
  'txt': {
    color: '',
    icon: 'file-text',
  },
  'md': {
    color: '',
    icon: 'file-markdown'
  },
  'xls': {
    color: '',
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