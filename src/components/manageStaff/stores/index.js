import React, { createContext } from 'react';
import { useLocalStore, observer } from 'mobx-react-lite';


export const MyStaffContext = createContext(null);

export const StaffStore = observer((props) => {
  const TableAttrStore = useLocalStore(() => ({
    loading: false,   // 表格loading
    get getLoading() {
      return this.loading
    },
    setLoading(data) {
      this.loading = data;
    },

    deleteMoreBtnDisabled: true,
    setBtnDisabled(data) {
      this.deleteMoreBtnDisabled = data;
    },
    get getBtnDisabled() {
      return this.deleteMoreBtnDisabled
    },

    addBtnDisabled: true,
    setAddDisabled(data) {
      this.addBtnDisabled = data;
    },
    get getAddDisabled() {
      return this.addBtnDisabled
    },

    rowselection: [], // 选中的数据
    setRowSelection(data) {
      this.rowselection = data
    },
    get getRowSelection() {
      return this.rowselection.slice();
    },

    allStaffInfo: [],  //表格数据
    setStaffInfo(data) {
      this.allStaffInfo = data;
    },
    get getAllStaff() {
      return this.allStaffInfo.slice();
    },

    currentPage: 1,
    setPage(data) {
      this.currentPage = data
    },
    get getCurrentPage() {
      return this.currentPage
    },

    totalPages: 0,
    get getTotalPages() {
      return this.totalPages
    },
    setTotalPages(data) {
      this.totalPages = data
    }
  }));

  const value = {
    ...props,
    TableAttrStore,
    // SearchFormStore,
  }
  return (
    <MyStaffContext.Provider value={value}>
      {props.children}
    </MyStaffContext.Provider>
  );
});