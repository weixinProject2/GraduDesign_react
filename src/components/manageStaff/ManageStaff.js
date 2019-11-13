import React, { Fragment, useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite'
import { MyStaffContext } from './stores'
import { Button, message, Drawer } from 'antd'
import { getAllStaffInfo, deleteStaffById, getProfessional, getDepartment, getPosition } from '../../api'
import StaffForm from './MangeStaffForm';
import AddStaffForm from './AddStaffForm'
import SearchForm from './SearchForm';

export default observer(() => {
    const {
        TableAttrStore: {
            setStaffInfo,
            setLoading,
            getRowSelection,
            getCurrentPage, setTotalPages, setPage, getTotalPages,
            getBtnDisabled,
            setBtnDisabled,
            getAddDisabled,
            setAddDisabled,
            setStaffVisible,
            getStaffVisble,
            setDeptsOpts, getAllDeptsOpts,
            getAllPf, setPf,
            getAllPos, setPosition,
            getQueryFields,
        }
    } = useContext(MyStaffContext);

    useEffect(() => {
        loadAllOpts();
    }, []);

    function loadAllOpts() {
        Promise.all([getProfessional(), getDepartment(), getPosition()]).then((res) => {
            if (res.length > 0) {
                setPf(res[0].data);
                setDeptsOpts(res[1].data);
                setPosition(res[2].data);
            } else {
                message.error('拉取数据失败！')
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    function refresh() {
        const params = {
            page: getCurrentPage,
            size: 10,
            queryFiled: getQueryFields
        }
        loadStaffInfo(params);
    }

    // 加载数据
    function loadStaffInfo(params, msgSuccess) {
        setLoading(true);
        setAddDisabled(true);
        const { page, size, queryFiled } = params && params

        const object = {
            page: page ? page : 1,
            size: size ? size : 10,
            queryFiled: queryFiled ? queryFiled : null
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
            queryFiled: getQueryFields,
        }
        deleteStaffById(object).then((res) => {
            if (!res.error) {
                setBtnDisabled(true)
                loadStaffInfo(params, '批量删除成功！');
                return true;
            } else {
                message.error(res.message);
                return false;
            }
        })
    }

    function openStaffDrawer() {
        setStaffVisible(true);
    }

    function closeStaffDrawer() {
        setStaffVisible(false)
    }

    return (
        <div className="gradu-staff-manage">
            <header className="gradu-content-header">
                <Button icon="user-add" ghost type='primary' disabled={getAddDisabled} onClick={openStaffDrawer}>增加员工</Button>
                <Button icon="usergroup-delete" ghost type='primary' onClick={deleteMore} disabled={getBtnDisabled}>批量删除员工</Button>
                <Button icon="reload" ghost type='primary' onClick={refresh} disabled={getAddDisabled}>刷新</Button>
            </header>
            <div className="gradu-form-content">
                <h2>员工信息列表</h2>
                <SearchForm />
                <StaffForm />
            </div>
            <Drawer
                title="增加员工"
                placement="right"
                width={450}
                closable={true}
                onClose={closeStaffDrawer}
                visible={getStaffVisble}
                destroyOnClose
            >
                <AddStaffForm />
            </Drawer>
        </div>
    )
})