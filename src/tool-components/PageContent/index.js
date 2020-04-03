import React from 'react';

import ProtoTypes from 'prop-types';

import './index.less';

const PageContent = (props) => {
    const { children } = props;
    return (
        <div className="page-content">
            {children}
        </div>
    )
}

export default PageContent;