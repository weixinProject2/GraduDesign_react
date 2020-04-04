import React, { useState } from 'react';
import "./index.less";
import { Icon, Tooltip, Button, Modal, message, Alert } from 'antd';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react-lite';
import { deleteAdminFile } from '../../../../api';
import { useFileStore } from '../../stores'

const { confirm } = Modal;

const fileTypeObj = {
  'gif': {
    color: '#eb6a34',
    icon: 'file-image',
  },
  'zip': {
    color: '#eebf2c',
    icon: 'file-zip',
  },
  'rar': {
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



const fileTypeBlock = observer(({ kinds, filename, fileId, fileDesc, createTime, filepath, }) => {
  const [shadowBlock, setDisplay] = useState(true);
  const [confirmLoading, setConfrimLoading] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);

  const {
    mainStore: {
      loadInfo,
    },
  } = useFileStore();

  function downLoadFile() {
    window.location.href = filepath;
  }

  function deleteFile() {
    setConfrimLoading(true);
    deleteAdminFile({ fileId: fileId }).then((res) => {
      if (!res.error) {
        setConfrimLoading(false);
        message.success(res.message);
        loadInfo();
        setDeleteVisible(false);
        setDisplay(true);
      } else {
        setConfrimLoading(false);
        message.error(res.message);
      }
    })
  }

  function openDeleteModal() {
    setDeleteVisible(true);
  }

  return (
    <div className="gradu-file-block" file-key={fileId}>
      <main>
        <Tooltip placement="top" title={fileDesc}>
          <Icon
            type={fileTypeObj[kinds] ? fileTypeObj[kinds].icon : 'file-unknown'}
            theme="twoTone"
            twoToneColor={fileTypeObj[kinds] ? fileTypeObj[kinds].color : "#666"}
            onClick={() => setDisplay(false)}
          />
        </Tooltip>

        <div
          className="gradu-file-opts"
          style={{ display: shadowBlock ? 'none' : 'flex' }}
        >
          <span><Icon type="read" />文件预览</span>
          <span onClick={downLoadFile}><Icon type="download" />下载</span>
          <span onClick={openDeleteModal}><Icon type="delete" />删除</span>
          <span onClick={() => setDisplay(true)}>
            <Icon type="close" />
          </span>
        </div>
      </main>
      <footer>

        <span>{filename}</span>
        <span>{`文件类型：.${kinds}`}</span>
        <span>上传时间：{createTime}</span>
      </footer>

      <Modal
        title={'删除文件'}
        visible={deleteVisible}
        onOk={deleteFile}
        onCancel={() => setDeleteVisible(false)}
        okText="确认"
        okButtonProps={{
          loading: confirmLoading,
          type: 'danger',
        }}
        cancelText="取消"
      >
        <Alert
          message="警告"
          description={`${filename}文件将会从系统上永久删除`}
          type="warning"
          showIcon
        />
      </Modal>
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