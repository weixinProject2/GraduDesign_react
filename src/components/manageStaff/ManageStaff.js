import React, { Fragment, useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite'
import { MyStaffContext } from './stores'
import { Button, message, Drawer } from 'antd'
import { getAllStaffInfo, deleteStaffById } from '../../api'
import StaffForm from './MangeStaffForm';
import AddStaffForm from './AddStaffForm'
import SearchForm from './SearchForm';
import TableContainer from '../../tool-components/TableContainerStyle';

export default observer(() => {
    const {
        TableAttrStore: {
            setStaffInfo,
            setLoading,
            getRowSelection,
            getCurrentPage, setTotalPages,
            getBtnDisabled,
            setBtnDisabled,
            getAddDisabled,
            setAddDisabled,
            setStaffVisible,
            getStaffVisble,
            getQueryFields
        }
    } = useContext(MyStaffContext);

    useEffect(() => {
    }, []);


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
                setLoading(false);
                setStaffInfo(data.list);
                setTotalPages(data.total);
                setAddDisabled(false);
                if (msgSuccess) {
                    message.success(msgSuccess);
                }
            } else {
                setLoading(false);
                setStaffInfo([]);
                setTotalPages(0);
                setAddDisabled(false);
                message.error("加载失败！");
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

    const headerBtns = (
        <Fragment>
            <Button icon="user-add" ghost type='primary' disabled={getAddDisabled} onClick={openStaffDrawer}>增加员工</Button>
            <Button icon="usergroup-delete" ghost type='danger' onClick={deleteMore} disabled={getBtnDisabled}>批量删除员工</Button>
            <Button icon="reload" ghost type='primary' onClick={refresh} disabled={getAddDisabled}>刷新</Button>
        </Fragment>
    )

    return (
        <TableContainer title="员工信息列表" headerButtons={headerBtns}>
            <SearchForm />
            <StaffForm />
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
        </TableContainer>
    )
})