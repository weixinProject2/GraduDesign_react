import React, { Component, Fragment } from 'react';
import { Cascader, } from 'antd'
import options from '../../utils/china-division';
class AddressPick extends Component {
    render() {
        return (
            <Fragment>
                <Cascader
                    options={options}
                    changeOnSelect
                    {...this.props}
                    popupPlacement="bottomRight"
                />
            </Fragment>
        )
    }
}
export default AddressPick;
