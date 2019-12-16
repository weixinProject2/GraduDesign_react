import React, { Component } from 'react';
import { Cascader } from 'antd'
import axios from 'axios';

class AddressPick extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
        }
    }

    loadDataSource = (keywords) => {
        return axios.get(`https://restapi.amap.com/v3/config/district?keywords=${keywords}&key=831443d25057217ffa028469c81652cb&subdistrict=1&extensions=base`);
    }

    handleOpts = (array) => {
        let myArray = [];
        array.forEach((e) => {
            const obj = {
                value: e.name,
                label: e.name,
                isLeaf: e.level === 'street',
            };
            if (e.districts.length > 0) {
                obj.children = this.handleOpts(e.districts);
            }
            myArray.push(obj);
        })
        return myArray;
    }

    loadData = selectedOptions => {
        const targetOption = selectedOptions[selectedOptions.length - 1];
        const value = targetOption.value;
        targetOption.loading = true;
        // load options lazily
        setTimeout(async () => {
            targetOption.loading = false;
            await this.loadDataSource(value).then((res) => {
                if (res.data.districts[0].districts.length > 0) {
                    targetOption.children = this.handleOpts(res.data.districts[0].districts);
                } else {
                    targetOption.children = []
                }
            })
            this.setState({
                dataSource: [...this.state.dataSource],
            });
        }, 500);
    }

    componentDidMount() {
        this.loadDataSource('中国').then((res) => {
            this.setState({
                dataSource: this.handleOpts(res.data.districts[0].districts)
            })
        });
    }

    render() {
        return (
            <Cascader
                placeholder="请选择地址"
                options={this.state.dataSource}
                loadData={this.loadData}
                changeOnSelect
                {...this.props}
            />
        )
    }
}
export default AddressPick;
