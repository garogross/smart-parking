import React from 'react';

import { useDispatch, useSelector } from "react-redux";
import { getTenants, resetTenant, setTenantsPage } from "../../../redux/action/tenants";
import { getParking,  setParkingPage } from "../../../redux/action/parking";

import ParkingListResetLoading from "./ParkingListResetLoading/ParkingListResetLoading";
import Header from "../../global/Header/Header";
import Table from "../../global/Table/Table";

import { userRoles} from "../../../constants";
import { tableParams } from "./tableProps";
import { useNavigate, useParams } from 'react-router-dom';
import { parkingPagePath } from '../../../router/path';


function ParkingList() {
    const dispatch = useDispatch()
    const params = useParams()
    const navigate = useNavigate()


    const user = useSelector(state => state.auth.user)
    const role = user.role
    const isAdmin = role === userRoles.admin && !params.id
    const curState = isAdmin ? 'tenants' : 'parking'
    const data = useSelector(state => state[curState].data)
    const totalCount = useSelector(state => state[curState].totalCount)
    const curPage = useSelector(state => state[curState].page)
    const getLoading = useSelector(state => state[curState].getLoading)


    const getData = (filters, page, sortBy) => {
        const setPage = (page) => isAdmin ? setTenantsPage(page) : setParkingPage(page)
        if (page !== curPage) dispatch(setPage(page))
        let getId =  null

        if(role === userRoles.tenant) getId = user.organization
        else if (params.id) getId = params.id
        const getFunc = () => isAdmin ? getTenants({}, sortBy) : getParking(getId, sortBy)
        dispatch(getFunc(filters))
    }

    const onResetTenant = (id) => {
        dispatch(resetTenant(id))
    }

    const goToTenant = (id) => {
        navigate(`${parkingPagePath}/${id}`)
    }

    const { cols, setCols, flexCols, titles } = tableParams?.[params.id ? userRoles.moderator : role] // if parking tenant page it will show moderator columns 
    // const src = `/api/stream/${isExit ? "exit" : "entry"}/index.m3u8`

    return (
        <>
            <Header
                title={`> Парковка ${params.id ? '> Арендатор' : ""}`}
                totalCount={totalCount}
                page={curPage}
            />

            <Table
                titles={titles}
                cols={setCols ? setCols(onResetTenant,goToTenant) : cols}
                flexCols={flexCols}
                data={data}
                loading={getLoading}
                totalCount={totalCount}
                page={curPage}
                getData={getData}
            />
            {isAdmin ? <ParkingListResetLoading /> : null}
        </>
    );
}

export default ParkingList;