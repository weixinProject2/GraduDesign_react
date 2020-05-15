import React from 'react';
import { message } from 'antd'
import { useLocalStore } from 'mobx-react-lite';
import { getSysNotice } from '../../../api';
export default function useStore() {
  return useLocalStore(() => ({
    params: {
      page: 1,
      size: 10,
      title: null,
      endTime: null,
      startTime: null,
    },
    setQueryFileds(value) {
      this.params.title = value && value.title ? value.title : null;
      this.params.endTime = value && value.endTime ? value.endTime : null;
      this.params.startTime = value && value.startTime ? value.startTime : null
    },
    get getCurrentPage() {
      return this.params.page;
    },
    setCurrentPage(pageNumber) {
      this.params.page = pageNumber;
    },
    // tableLoading
    tableLoading: false,
    get getTableLoading() {
      return this.tableLoading;
    },
    setTableLoading(value) {
      this.tableLoading = value;
    },
    // 加载数据
    loadInfo() {
      this.setTableLoading(true);
      this.setBtnDisabled(true);
      getSysNotice(this.params).then((res) => {
        if (!res.error) {
          this.setTableLoading(false);
          this.setTableData(res.list);
          this.setTotalPage(res.total);
          this.setBtnDisabled(false);
        } else {
          message.error(res.mess);
        }
      })
    },
    // 每一页的数据
    tableData: [],
    get getTableData() {
      return this.tableData;
    },
    setTableData(value) {
      this.tableData = value;
    },
    // 所有数据量
    totalPage: 0,
    get getTotalPage() {
      return this.totalPage;
    },
    setTotalPage(value) {
      this.totalPage = value;
    },
    btnDisabled: true,
    setBtnDisabled(value) {
      this.btnDisabled = value;
    },
    get getBtnDisabled() {
      return this.btnDisabled;
    },
    rowSelected: [],
    get getRowSelect() {
      return this.rowSelected.slice();
    },
    setRowSelect(value) {
      this.rowSelected = value;
    },
    deleteMoreDisabled: false,
    setDeleteMoreBtn(value) {
      this.deleteMoreDisabled = value;
    },
    get getDeleteMoreDisabled() {
      return this.deleteMoreDisabled;
    },

    announceId: null,
    setAnnounceId(value) {
      this.announceId = value;
    },

    detailModal: false,
    setDetailModal(value) {
      this.detailModal = value;
    }

  }))
}