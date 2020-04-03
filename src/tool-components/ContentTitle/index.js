import React from 'react';
import PropTypes from 'prop-types';
import "./index.less";

const contentTitle = ({ title }) => (
    <div className="page-content-title">
        {title}
    </div>
)

contentTitle.propTypes = {
    title: PropTypes.string.isRequired,
};

export default contentTitle;