import React from 'react';

import ProtoTypes from 'prop-types';

import './index.less';


const PageContent = (props) => {
    const { children, hasSideTree } = props;
    return (
        !hasSideTree ? <div className="page-content">
            {children}
        </div> :
            <div className="page-side-content">
                <div className="page-side-content-left">
                    {hasSideTree}
                </div>
                <div className="page-side-content-right">
                    {children}
                </div>
            </div>
    )
}

export default PageContent;