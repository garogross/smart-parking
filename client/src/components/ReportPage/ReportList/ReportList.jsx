import React from 'react';
import Header from "../../global/Header/Header";
import Table from "../../global/Table/Table";
import HeaderActions from "../../global/HeaderActions/HeaderActions";
import {headerActionTypes, } from "../../../constants";
import {cols,flexCols,titles} from "./tableProps";
import {useDispatch, useSelector} from "react-redux";
import {getTenants, setTenantsPage} from "../../../redux/action/tenants";


function ReportList() {
    const dispatch = useDispatch()

    const data = useSelector(state => state.tenants.data)
    const totalCount = useSelector(state => state.tenants.totalCount)
    const curPage = useSelector(state => state.tenants.page)
    const getLoading = useSelector(state => state.tenants.getLoading)

    const getData = (filters, page,sortBy) => {
        if (page !== curPage) dispatch(setTenantsPage(page))
        dispatch(getTenants(filters,sortBy))
    }

    const headerActions = [
        {
            key: headerActionTypes.download,
            props: {
                onClick: () => console.dir("click")
            }
        },
    ]


    return (
        <>
            <Header
                title={'> История посещений'}
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
                getData={getData}
            />
        </>
    );
}

export default ReportList;