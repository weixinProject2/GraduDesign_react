import React from 'react';

import PropTypes from 'prop-types';
import { Icon } from 'antd';
import './index.less'

const jobType = {
  job: {
    type: 'check',
    isFilled: false,
  },
  bug: {
    type: 'bug',
    isFilled: true,
  }
}

const jobTypeIcon = ({ type, size }) => {
  const styles = {
    fontSize: `${size}px`,
  };

  return (
    <Icon
      className="gradu-sprint-job-icon"
      style={styles}
      type={jobType[type].type} theme={jobType[type].isFilled && 'filled'} />
  )
};

jobTypeIcon.protoTypes = {
  type: PropTypes.string.isRequired,
  size: PropTypes.number,
}
jobTypeIcon.defaultProps = {
  size: 12,
}

export default jobTypeIcon;