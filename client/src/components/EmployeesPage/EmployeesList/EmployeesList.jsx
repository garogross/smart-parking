import React, {useEffect, useState} from 'react';
import Header from "../../global/Header/Header";
import Table from "../../global/Table/Table";
import HeaderActions from "../../global/HeaderActions/HeaderActions";
import {headerActionTypes, userRoles} from "../../../constants";
import {flexCols, titles, setCols} from "./tableProps";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {createEmployeePagePath, createTenantPagePath} from "../../../router/path";
import {useDispatch, useSelector} from "react-redux";
import {notPopupTexts} from "../../../utils/notPopupTexts";
import {getEmployees, setEmployeesPage} from "../../../redux/action/employees";
import TenantsDeletePopup from "../../TenantsPage/TenantsList/TenantsDeletePopup/TenantsDeletePopup";
import NotPopup from "../../layout/NotPopup/NotPopup";
import EmployeesDeletePopup from "./EmployeesDeletePopup/EmployeesDeletePopup";



function EmployeesList() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()
    const {state,pathname} = useLocation()

    const data = useSelector(state => state.employees.data)
    const user = useSelector(state => state.auth.user)
    const totalCount = useSelector(state => state.employees.totalCount)
    const curPage = useSelector(state => state.employees.page)
    const getLoading = useSelector(state => state.employees.getLoading)

    const [deleteItemId, setDeleteItemId] = useState(null)
    const [filters, setFilters] = useState({})
    const [notPopupText, setNotPopupText] = useState('')

    const isTenant = user?.role === userRoles.tenant
    const id = isTenant ? user?.organization : params.id
    const formattedData = data
        .filter(item => item.organization._id === id)
        .map(item => ({
        ...item,
        cars: item?.cars?.length ? item.cars[0] : null
    }))


    useEffect(() => {
        if (state?.notPopupText) {
            setNotPopupText(state?.notPopupText)
            navigate(pathname)
        }
    }, []);

    const onOpenDeletePopup = (id) => {
        setDeleteItemId(id)
    }
    const onCloseDeletePopup = () => setDeleteItemId(null)
    const onCloseNotPopup = () => setNotPopupText("")

    const onDeleteSuccess = () => {
        setNotPopupText(notPopupTexts.employee.delete)
    }

    const getData = (filters, page) => {
        if (page !== curPage) dispatch(setEmployeesPage(page))
        dispatch(getEmployees(id,filters))
    }

    const headerActions = [
        {
            key: headerActionTypes.add,
            props: {
                onClick: () => {
                    const path = isTenant ? createEmployeePagePath : `${createEmployeePagePath}/${id}`
                    navigate(path)
                }
            },
        },
        {
            key: headerActionTypes.refresh,
            props: {
                onClick: () => dispatch(getEmployees(id,filters))
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
                title={id ? '> Арендаторы > Сотрудники' : '> Сотрудники'}
                totalCount={totalCount}
                page={curPage}
            />
            <HeaderActions actions={headerActions}/>
            <Table
                titles={titles}
                cols={cols}
                flexCols={flexCols}
                data={formattedData}
                loading={getLoading}
                totalCount={totalCount}
                page={curPage}
                setFilters={setFilters}
                getData={getData}
            />
            <EmployeesDeletePopup
                id={deleteItemId}
                onClose={onCloseDeletePopup}
                filters={filters}
                onDeleteUserSuccess={onDeleteSuccess}
            />
            <NotPopup onClose={onCloseNotPopup} text={notPopupText}/>
        </>
    );
}

export default EmployeesList;