import React from 'react';
import Header from "../../global/Header/Header";
import Table from "../../global/Table/Table";
import {userRoles} from "../../../constants";
import {tableParams} from "./tableProps";
import {useDispatch, useSelector} from "react-redux";
import {getTenants, resetTenant, setTenantsPage} from "../../../redux/action/tenants";
import {getParking, setParkingPage} from "../../../redux/action/parking";
import LoadingPopup from "../../layout/LoadingPopup/LoadingPopup";
import MainListResetLoading from "./MainListResetLoading/MainListResetLoading";


function MainList(props) {
    const dispatch = useDispatch()


    const user = useSelector(state => state.auth.user)
    const role = user.role
    const isAdmin = role === userRoles.admin
    const curState = isAdmin ? 'tenants' : 'parking'
    const data = useSelector(state => state[curState].data)
    const totalCount = useSelector(state => state[curState].totalCount)
    const curPage = useSelector(state => state[curState].page)
    const getLoading = useSelector(state => state[curState].getLoading)


    const getData = (filters, page) => {
        const setPage = (page) => isAdmin ? setTenantsPage(page) : setParkingPage(page)
        if (page !== curPage) dispatch(setPage(page))
        const getId = role === userRoles.tenant ? user.organization : null
        const getFunc = () => isAdmin ? getTenants() : getParking(getId)
        dispatch(getFunc(filters))
    }

    const onResetTenant = (id) => {
        dispatch(resetTenant(id))
    }

    const {cols,setCols,flexCols,titles} = tableParams?.[role]

    return (
        <>
            <Header
                title={'> Парковка'}
                totalCount={totalCount}
                page={curPage}
            />
            <Table
                titles={titles}
                cols={setCols ? setCols(onResetTenant) : cols}
                flexCols={flexCols}
                data={data}
                loading={getLoading}
                totalCount={totalCount}
                page={curPage}
                getData={getData}
            />
            {isAdmin ? <MainListResetLoading/> : null}
        </>
    );
}

export default MainList;