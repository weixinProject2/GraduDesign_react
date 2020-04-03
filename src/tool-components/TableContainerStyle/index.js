import React from 'react';

import TableHeader from '../TableHeader';
import ContentTitle from '../ContentTitle';
import PageContent from '../PageContent';

import "./index.less";

const PageConatiner = (props) => {
    const {
        headerButtons,
        title,
        hasBack,
        children,
        style,
    } = props;

    return (
        <div className="page-container" {...style} >
            <TableHeader headerButtons={headerButtons} hasBack={hasBack} />
            {title && <ContentTitle title={title} />}
            <PageContent>
                {children}
            </PageContent>
        </div>
    )
}

export default PageConatiner;