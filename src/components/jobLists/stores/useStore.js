import React from 'react';
import { useLocalStore } from 'mobx-react-lite';
import { message } from 'antd';
import { getAllJobs, getSprintList } from '../../../api';

export default function useStore() {
  return useLocalStore(() => ({
    activeKey: 'details',
    setActiveKey(value) {
      this.activeKey = value;
    },
    get getActiveKey() {
      return this.activeKey;
    },

    addSprintModal: false,
    setAddSprintModal(value) {
      this.addSprintModal = value;
    },

    // 冲刺列表
    sprintData: [],
    setSprintData(value) {
      this.sprintData = value;
    },
    get getSprintData(){
      return this.sprintData.slice();
    },
    loadSprintData(projectId) {
      this.sprintBtnDisabled = true;
      this.sprintLoading = true;
      getSprintList({ projectId }).then((res) => {
        if(!res.error){
          this.setSprintData(res.list);
          this.sprintLoading = false;
          this.sprintBtnDisabled = false;
        }else{
          this.setSprintData([]);
          this.sprintLoading= false;
        }
      })
    },

    sprintLoading: false,
    setSprintLoading(value) {
      this.sprintLoading = value;
    },

    sprintBtnDisabled: false,
    setSprintBtnDisabled(value) {
      this.sprintBtnDisabled = value;
    },

    // 所有问题列表
    params: {
      page: 1,
      size: 10,
      sprintId: null,
      status: null,
      kinds: null,
      problemName: null,
    },

    setQueryFileds(value) {
      this.params.sprintId = value && value.sprintId ? value.sprintId : null;
      this.params.kinds = value && value.status ? value.status : null;
      this.params.problemName = value && value.problemName ? value.problemName : null;
      this.params.status = value && value.status ? value.status : null
    },

    tableBtnDiabled: false,
    setTableBtnDisabled(value) {
      this.tableBtnDiabled = value;
    },

    tableLoading: false,
    setTableLoading(value) {
      this.tableLoading = value;
    },

    tableData: [],

    loadTableData(projectId) {
      this.params.projectId = projectId;
      this.setTableBtnDisabled(true);
      this.setTableLoading(true);
      getAllJobs(this.params).then((res) => {
        if (!res.error) {
          this.tableData = res.list;
          this.setTableBtnDisabled(false);
          this.setTableLoading(false);
          this.setTotalPage(res.total);
        } else {
          message.error(res.message);
          this.tableData = [];
          this.setTableLoading(true);
          this.setTotalPage(0);
        }
      })
    },

    get getTableData() {
      return this.tableData.slice();
    },
    // 所有数据量
    totalPage: 0,
    get getTotalPage() {
      return this.totalPage;
    },
    setTotalPage(value) {
      this.totalPage = value;
    },

    // 当前页码
    get getCurrentPage() {
      return this.params.page;
    },
    setCurrentPage(value) {
      this.params.page = value;
    },
  }))
}