import React from 'react';
import PropTypes from 'prop-types';
import "./index.less";

const contentTitle = ({ title, style }) => (
    <div className="page-content-title" style={style}>
        {title}
    </div>
)

contentTitle.propTypes = {
    title: PropTypes.isRequired,
};

export default contentTitle;