import React, { useEffect, Fragment } from 'react';
import { observer } from 'mobx-react-lite';
import { withRouter } from 'react-router-dom';


export default observer(withRouter((props) => {
    const { location } = props;
    return (
        <Fragment>
            hello{location.search}
        </Fragment>
    );
}));