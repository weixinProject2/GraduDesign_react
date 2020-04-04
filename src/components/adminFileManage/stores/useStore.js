import React from 'react';
import { useLocalStore } from 'mobx-react-lite';
import { getAllAdminFile } from '../../../api';
import { message } from 'antd';

export default function useStore() {
    return useLocalStore(() => ({

        // 每一页的数据
        tableData: [],
        get getTableData() {
            return this.tableData.slice();
        },
        setTableData(value) {
            this.tableData = value;
        },

        btnDisabled: true,
        setBtnDisabled(value) {
            this.btnDisabled = value;
        },
        get getBtnDisabled() {
            return this.btnDisabled;
        },

        // 加载数据
        loadInfo() {
            this.setLoading(true);
            this.setBtnDisabled(true);
            getAllAdminFile().then((res) => {
                if (!res.error) {
                    this.setLoading(false);
                    this.setTableData(res.list);
                    // this.setTotalPage(res.total);
                    this.setBtnDisabled(false);
                } else {
                    message.error(res.mess);
                }
            })
        },

        loading: true,
        setLoading(value) {
            this.loading = value;
        },
        get getLoading() {
            return this.loading;
        },

        addModalStatus: false,
        setAddModalStatus(value) {
            this.addModalStatus = value;
        },
        get getAddModalStatus() {
            return this.addModalStatus;
        },

        addModalBtnLoading: false,
        addModalDisabled: true,
        setOkBtnLoading(value) {
            this.addModalBtnLoading = value;
        },
        get getOkBtnLoading() {
            return this.addModalBtnLoading;
        },
        setOkBtnDisabled(value) {
            this.addModalDisabled = value;
        },
        get getOkBtnDisabled() {
            return this.addModalDisabled;
        }
    }))
}