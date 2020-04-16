import React from 'react';
import PropTypes from 'prop-types';
import './index.less'

const StatusTag = ({ size, status, text }) => {
  const styles = {
    fontSize: `${size}px`,
  }

  return (
    <span
      className={`gradu-status-tag gradu-status-tag-${status}`}
      style={{...styles}}
      >
      {text}
    </span>
  )
}

StatusTag.propTypes = {
  size: PropTypes.number,
  status: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}

StatusTag.defaultProps = {
  size: 10,
}

export default StatusTag;