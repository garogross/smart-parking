import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getOneTenant, getTenantReport} from "../../../redux/action/tenants";

import Header from "../../global/Header/Header";
import Table from "../../global/Table/Table";
import HeaderActions from "../../global/HeaderActions/HeaderActions";
import TenantReportDateFilterForm from "../TenantReportDateFilterForm/TenantReportDateFilterForm";
import TenantReportInfo from "../TenantReportInfo/TenantReportInfo";
import TenantReportDatesModal from "../TenantReportDatesModal/TenantReportDatesModal";

import { downloadTenantReportUrl} from "../../../redux/action/fetchTools";
import {headerActionTypes, tariffTypes,} from "../../../constants";
import {flexCols, setCols, timeConst, titles} from "./tableProps";


function TenantReportList() {
    const dispatch = useDispatch()
    const params = useParams()

    const data = useSelector(state => state.tenants.report)
    const tenants = useSelector(state => state.tenants.data)
    const getLoading = useSelector(state => state.tenants.getReportLoading)
    const totalCount = data.length
    const curTenant = tenants.find(item => item._id === params.id)
    const curPage = 0

    const [datesFilter,setDatesFilter] = useState({})
    const [datesModalOpenedId,setDatesModalOpenedId] = useState(null)


    const activeEmployee = datesModalOpenedId ? data.find(item => item._id === datesModalOpenedId) : null

    useEffect(() => {
        if (!curTenant) dispatch(getOneTenant(params.id))
    }, []);

    const openDatesModal = (id) => setDatesModalOpenedId(id)
    const closeDatesModal = () => setDatesModalOpenedId(null)

    const getData = () => {
        dispatch(getTenantReport(params.id))
    }

    const downloadQuery = datesFilter.dateFrom && datesFilter.dateTo
        ? `?dateFrom=${datesFilter.dateFrom}&dateTo=${datesFilter.dateTo}&`
        : ""

    const headerActions = [
        {
            key: headerActionTypes.download,
            props: {
                downloadUrl: `${downloadTenantReportUrl}${params.id}/${downloadQuery}`,
                fileName: 'tenant_report'
            }
        },
    ]



    const cols = setCols(openDatesModal)
    let titlesEdited = titles

    if (curTenant) {
        const inParkTimeTxt = curTenant.tariff === tariffTypes.guest ? "часы" : "дни"
        titlesEdited = titles.map(item => {
            if (item.name.includes(timeConst)) {
                return {
                    ...item,
                    name: item.name.replace(timeConst, inParkTimeTxt)
                }
            } else {
                return item
            }
        })
    }

    return (
        <>
            <Header
                title={'> Отчет Арендатора'}
                totalCount={totalCount}
                page={curPage}
            />
            <TenantReportDateFilterForm setDatesFilter={setDatesFilter}/>
            <TenantReportInfo tenant={curTenant}/>
            <HeaderActions actions={headerActions}/>
            <Table
                titles={titlesEdited}
                cols={cols}
                flexCols={flexCols}
                data={data}
                loading={getLoading}
                totalCount={totalCount}
                page={curPage}
                getData={getData}
            />
            <TenantReportDatesModal
                onClose={closeDatesModal}
                show={datesModalOpenedId}
                employee={activeEmployee}
                datesFilter={datesFilter}
            />
        </>
    );
}

export default TenantReportList;