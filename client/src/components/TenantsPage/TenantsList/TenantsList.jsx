import React, {useEffect, useState} from 'react';
import Header from "../../global/Header/Header";
import Table from "../../global/Table/Table";
import HeaderActions from "../../global/HeaderActions/HeaderActions";
import {headerActionTypes} from "../../../constants";
import {flexCols, titles, setCols} from "./tableProps";
import {useLocation, useNavigate} from "react-router-dom";
import {createTenantPagePath} from "../../../router/path";
import {useDispatch, useSelector} from "react-redux";
import {notPopupTexts} from "../../../utils/notPopupTexts";
import {getUsers, setUsersPage} from "../../../redux/action/users";
import {getTenants, setTenantsPage} from "../../../redux/action/tenants";
import NotPopup from "../../layout/NotPopup/NotPopup";
import UsersDeletePopup from "../../UsersPage/UsersList/UsersDeletePopup/UsersDeletePopup";
import TenantsDeletePopup from "./TenantsDeletePopup/TenantsDeletePopup";



function TenantsList() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {state} = useLocation()

    const data = useSelector(state => state.tenants.data)
    const totalCount = useSelector(state => state.tenants.totalCount)
    const curPage = useSelector(state => state.tenants.page)
    const getLoading = useSelector(state => state.tenants.getLoading)

    const [deleteItemId, setDeleteItemId] = useState(null)
    const [filters, setFilters] = useState({})
    const [notPopupText, setNotPopupText] = useState('')

    useEffect(() => {
        if (state?.notPopupText) setNotPopupText(state?.notPopupText)
    }, []);

    const onOpenDeletePopup = (id) => {
        setDeleteItemId(id)
    }
    const onCloseDeletePopup = () => setDeleteItemId(null)
    const onCloseNotPopup = () => setNotPopupText("")

    const onDeleteTenantSuccess = () => {
        setNotPopupText(notPopupTexts.tenant.delete)
    }


    const getData = (filters, page,sortBy) => {
        if (page !== curPage) dispatch(setTenantsPage(page))
        dispatch(getTenants(filters,sortBy))
    }

    const headerActions = [
        {
            key: headerActionTypes.add,
            props: {
                onClick: () => navigate(createTenantPagePath)
            },
        },
        {
            key: headerActionTypes.refresh,
            props: {
                onClick: () => dispatch(getTenants(filters))
            },
        },
        {
            key: headerActionTypes.showAll,
            props: {
                onClick: () => getData(null, +!(curPage)),
                isPassive: +!(curPage)
            },
        },
    ]

    const cols = setCols(navigate,onOpenDeletePopup)
    return (
        <>
            <Header
                title={'> Арендаторы'}
                totalCount={totalCount}
                page={curPage}
            />
            <HeaderActions actions={headerActions}/>
            <Table
                titles={titles}
                cols={cols}
                flexCols={flexCols}
                data={data}
                loading={getLoading}
                totalCount={totalCount}
                page={curPage}
                setFilters={setFilters}
                getData={getData}
            />
            <TenantsDeletePopup
                id={deleteItemId}
                onClose={onCloseDeletePopup}
                filters={filters}
                onDeleteUserSuccess={onDeleteTenantSuccess}
            />
            <NotPopup onClose={onCloseNotPopup} text={notPopupText}/>
        </>
    );
}

export default TenantsList;