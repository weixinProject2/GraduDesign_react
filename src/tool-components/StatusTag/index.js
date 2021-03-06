import React from 'react';
import PropTypes from 'prop-types';
import './index.less'
import { Tooltip } from 'antd';

const StatusTag = ({ size, status, text, dotted }, props) => {
  const styles = {
    fontSize: `${size}px`,
  }

  const dottedStyles = {
    height: `${size}px`,
    width: `${size}px`
  }

  return (
    !dotted && text ? <span
      className={`gradu-status-tag gradu-status-tag-${status}`}
      style={{ ...styles }}
      {...props}
    >
      {text}
    </span> : <Tooltip title={text}>
        <i
          className={`gradu-status-tag-dotted gradu-status-tag-dotted-${status}`}
          style={{ ...dottedStyles }}
          {...props}
        />
      </Tooltip>
  )
}

StatusTag.propTypes = {
  size: PropTypes.number,
  status: PropTypes.string.isRequired,
  // text: PropTypes.string.isRequired,
}

StatusTag.defaultProps = {
  size: 10,
}

export default StatusTag;