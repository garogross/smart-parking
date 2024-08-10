import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {openBareer} from "../../../redux/action/parking";
import {getHistory, setHistoryPage} from "../../../redux/action/history";
import {downloadHistoryUrl} from "../../../redux/action/fetchTools";

import Header from "../../global/Header/Header";
import Table from "../../global/Table/Table";
import HeaderActions from "../../global/HeaderActions/HeaderActions";
import VideoPlayer from "../../ParkingPage/VideoPlayer/VideoPlayer";
import MainBtn from "../../layout/MainBtn/MainBtn";

import {headerActionTypes, historyActionTypes, userRoles} from "../../../constants";
import {tableProps} from "./tableProps";
import styles from "./HistoryList.module.scss";


function HistoryList() {
    const dispatch = useDispatch()

    const user = useSelector(state => state.auth.user)
    const role = user.role
    const data = useSelector(state => state.history.data)
    const totalCount = useSelector(state => state.history.totalCount)
    const curPage = useSelector(state => state.history.page)
    const getLoading = useSelector(state => state.history.getLoading)

    const getData = (filters, page,sortBy) => {
        if (page !== curPage) dispatch(setHistoryPage(page))
        const getId = role === userRoles.tenant ? user.organization : null
        dispatch(getHistory(filters,getId,sortBy))
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
            {
                (user.role === userRoles.admin || user.role === userRoles.security) &&
                <div className={styles['historyList__cameraControl']}>
                    <div>
                        <VideoPlayer/>
                        <MainBtn onClick={() => openBareer(historyActionTypes.entry)}>Открыть шлагбаум</MainBtn>
                    </div>
                    <div>
                        <VideoPlayer isExit={true}/>
                        <MainBtn onClick={() => openBareer(historyActionTypes.exit)}>Открыть шлагбаум</MainBtn>
                    </div>

                </div>
            }
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
                defaultSort={'date-'}
            />
        </>
    );
}

export default HistoryList;