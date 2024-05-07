import React from 'react';
import Header from "../../global/Header/Header";
import Table from "../../global/Table/Table";
import HeaderActions from "../../global/HeaderActions/HeaderActions";
import {headerActionTypes, userRoles} from "../../../constants";
import {tableProps} from "./tableProps";
import {useDispatch, useSelector} from "react-redux";
import {getHistory, setHistoryPage} from "../../../redux/action/history";
import {downloadHistoryUrl} from "../../../redux/action/fetchTools";


function HistoryList() {
    const dispatch = useDispatch()

    const user = useSelector(state => state.auth.user)
    const role = user.role
    const data = useSelector(state => state.history.data)
    const totalCount = useSelector(state => state.history.totalCount)
    const curPage = useSelector(state => state.history.page)
    const getLoading = useSelector(state => state.history.getLoading)

    const getData = (filters, page) => {
        if (page !== curPage) dispatch(setHistoryPage(page))
        const getId = role === userRoles.tenant ? user.organization : null
        dispatch(getHistory(filters,getId))
    }

    const headerActions = [
        {
            key: headerActionTypes.download,
            props: {
                downloadUrl: downloadHistoryUrl,
                fileName: 'history'
            }
        },
    ]

    const {cols,flexCols,titles} = tableProps?.[role]
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

export default HistoryList;