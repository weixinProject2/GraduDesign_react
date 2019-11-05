import React, { Fragment, useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite'
import { MyStaffContext } from './stores'
import { Button, message } from 'antd'
import { getAllStaffInfo, deleteStaffById } from '../../api'
import StaffForm from './MangeStaffForm';

export default observer(() => {
    const {
        TableAttrStore: {
            setStaffInfo,
            setLoading,
            getRowSelection,
            getCurrentPage, setTotalPages, setPage, getTotalPages,
            getBtnDisabled,
            getAddDisabled,
            setAddDisabled
        }
    } = useContext(MyStaffContext);

    useEffect(() => {

    }, []);

    function refresh() {
        const params = {
            page: getCurrentPage,
            size: 10,
        }
        loadStaffInfo(params);
    }

    // 加载数据
    function loadStaffInfo(params, msgSuccess) {
        setLoading(true);
        setAddDisabled(true);
        const { page, size, queryData } = params && params

        const object = {
            page: page ? page : 1,
            size: size ? size : 10,
            queryData: queryData ? queryData : null
        }

        getAllStaffInfo(object).then((data) => {
            if (data.list) {
                setTimeout(() => {
                    setLoading(false);
                    setStaffInfo(data.list);
                    setTotalPages(data.total);
                    setAddDisabled(false);
                    if (msgSuccess) {
                        message.success(msgSuccess);
                    }
                }, 500);
            } else {
                setTimeout(() => {
                    setLoading(false);
                    setStaffInfo([]);
                    setTotalPages(0);
                    setAddDisabled(false);
                    message.error("加载失败！");
                }, 500);
            }
        }).catch((err) => {
            console.log(err);
        })

    }

    function deleteMore() {
        const object = {
            'ids': JSON.stringify(getRowSelection),
        }
        const params = {
            page: getCurrentPage,
            size: 10,
        }
        deleteStaffById(object).then((res) => {
            if (!res.error) {
                loadStaffInfo(params, '批量删除成功！');
                return true;
            } else {
                message.error(res.message);
                return false;
            }
        })
    }

    return (
        <div className="gradu-staff-manage">
            <header className="gradu-content-header">
                <Button icon="user-add" ghost type='primary' disabled={getAddDisabled} >增加员工</Button>
                <Button icon="usergroup-delete" ghost type='primary' onClick={deleteMore} disabled={getBtnDisabled}>批量删除员工</Button>
                <Button icon="reload" ghost type='primary' onClick={refresh} disabled={getAddDisabled}>刷新</Button>
            </header>
            <div className="gradu-form-content">
                <h2>员工信息列表</h2>
                <StaffForm />
            </div>
        </div>
    )
})