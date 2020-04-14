import React from 'react';
import PropTypes from 'prop-types';
import './index.less';
import { Empty } from 'antd';

const EmptyPage = ({ style, description }) => (
  <div className="gradu-empty-page" style={{...style}}>
    <Empty description={description} />
  </div>
)

EmptyPage.propTypes = {
  description: PropTypes.string,
};

EmptyPage.defaultProps = {
  description: '暂无数据...',
};

export default EmptyPage;