import React, { useState, Fragment } from 'react';
import "./index.less";
import { Icon, Tooltip, Button, Modal, message, Alert } from 'antd';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react-lite';
import { deleteAdminFile, changeFilePublic } from '../../../../api';
import { useFileStore } from '../../stores'

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
  'pptx': {
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



const fileTypeBlock = observer(({ kinds, filename, fileId, fileDesc, createTime, filepath, isPublic }) => {
  const [shadowBlock, setDisplay] = useState(true);
  const [confirmLoading, setConfrimLoading] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [fileOverview, setOverview] = useState(false);

  const {
    permissions,
    mainStore: {
      loadInfo, setQueryFileds, setCurrentPage, getSelectedTreeNode,
    },
  } = useFileStore();

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
    setDisplay(true);
  }

  function openViewModal() {
    setOverview(true);
    setDisplay(true);
  };

  function changeType() {
    const isPublicType = isPublic ? 0 : 1;
    const obj = {
      fileId: fileId,
      isPublic: isPublicType,
    }
    changeFilePublic(obj).then((res) => {
      if (!res.error) {
        message.success(res.message);
        setDisplay(true);
        setCurrentPage(1);
        setQueryFileds(null);
        loadInfo();
      } else {
        message.error(res.message);
      }
    })
  }

  function renderOpts() {
    const isOverview = kinds === 'pdf' || kinds === 'txt' || kinds === 'png' || kinds === 'gif' || kinds === 'jpg';
    const isDownload = kinds === 'png' || kinds === 'gif' || kinds === 'jpg' || kinds === 'txt';
    const publicTypeText = !isPublic ? '设为公开' : '设为私有';
    return (
      <Fragment>
        {isOverview && <span className='gradu-file-opts-item' onClick={openViewModal}><Icon type="read" />文件预览</span>}
        {!isDownload && <span className='gradu-file-opts-item'><Icon type="download" /><a target='_blank' download={filename} href={filepath}>下载</a></span>}
        {permissions === '0' && <span className='gradu-file-opts-item' onClick={changeType}><Icon type="safety-certificate" />{publicTypeText}</span>}
        {
          getSelectedTreeNode !== '100000' && getSelectedTreeNode !== '200000' && < span
            style={{ borderRadius: '0 0 9px 9px' }}
            className='gradu-file-opts-item' onClick={openDeleteModal}><Icon type="delete" />删除</span>
        }
      </Fragment >
    )
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
          style={{ display: shadowBlock ? 'none' : 'block' }}
        >
          {renderOpts()}
          <span onClick={() => setDisplay(true)} className="gradu-file-opts-close">
            <Icon type="close" />
          </span>
        </div>
      </main>
      <footer>
        <span>{filename}</span>
        {permissions === '0' && <span>文件权限：
          <strong
            style={{ color: !isPublic ? '#ff0000c7' : '#17b3a3' }}>
            {isPublic ? '公开' : '私有'}
          </strong>
        </span>}
        <span>文件类型<strong>{`：.${kinds}`}</strong></span>
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
      <Modal
        title={filename}
        visible={fileOverview}
        footer={null}
        onCancel={() => setOverview(false)}
        width='800px'
        centered
      >
        <iframe
          width='100%'
          height='500px'
          style={{ border: 'none' }}
          frameBorder='1'
          src={filepath}
        >
          <head>
            <meta httpEquiv="Content-Type" content="text/html; charset=gbk" />
          </head>
        </iframe>
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