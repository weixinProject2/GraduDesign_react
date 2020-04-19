import React from 'react';
import PropTypes from 'prop-types';
import './index.less';
import { Empty } from 'antd';

const EmptyPage = ({ style, description, emptyButton }) => (
  <div className="gradu-empty-page" style={{ ...style }}>
    <Empty description={description} >
      {emptyButton}
    </Empty>
  </div>
)

EmptyPage.propTypes = {
  description: PropTypes.string,
};

EmptyPage.defaultProps = {
  description: '暂无数据...',
};

export default EmptyPage;