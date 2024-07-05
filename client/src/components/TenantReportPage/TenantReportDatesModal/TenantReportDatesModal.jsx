import React, {useEffect} from 'react';
import NewPortalProvider from "../../../providers/NewPortalProvider";
import Backdrop from "../../layout/Backdrop/Backdrop";
import TransitionProvider from "../../../providers/TransitionProvider";
import {formatFullName} from "../../../utils/functions/formatFullName";

import styles from "./TenantReportDatesModal.module.scss"
import {useDispatch, useSelector} from "react-redux";
import {clearEmployeeHistory, getEmployeeHistory} from "../../../redux/action/history";
import {formatDate} from "../../../utils/functions/date";
import {historyActionTypes} from "../../../constants";
import CrossBtn from "../../layout/CrossBtn/CrossBtn";

function TenantReportDatesModal({employee, onClose, show,datesFilter}) {
    const dispatch = useDispatch()

    const data = useSelector(state => state.history.employeeHistory)


    useEffect(() => {
        if(show) dispatch(getEmployeeHistory(employee?._id,datesFilter))
    }, [employee]);

    useEffect(() => {
        if(!show && data?.length) dispatch(clearEmployeeHistory())
    }, [show]);

    return (
        <>
            <Backdrop onClose={onClose} inProp={show}/>
            <NewPortalProvider>
                <TransitionProvider
                    style={"opacity"}
                    inProp={show && data}
                    className={`popupBox ${styles['tenantReportDatesModal']}`}
                >
                    <CrossBtn onClick={onClose}/>
                    <h2 className={`popupTitle ${styles['tenantReportDatesModal__title']}`}>{formatFullName(employee?.fullName)}</h2>
                    <div className={styles['tenantReportDatesModal__listItem']}>
                        <p className={styles['tenantReportDatesModal__listTxt']}>Дата</p>
                        <p className={styles['tenantReportDatesModal__listTxt']}>Тип</p>
                    </div>
                    <br/>
                    <div className={`scrollbarDef ${styles['tenantReportDatesModal__list']}`}>
                        {
                            data
                                ? data.map(item => (
                                        <div className={styles['tenantReportDatesModal__listItem']}>
                                            <p className={styles['tenantReportDatesModal__listTxt']}>{formatDate(item.date)}</p>
                                            <p className={`${styles['tenantReportDatesModal__listTxt']} ${styles[`tenantReportDatesModal__listTxt_${item.type === historyActionTypes.entry ? "green" : "red"}`]}`}>{item.type}</p>
                                        </div>
                                    ))
                                :
                                <p className={`${styles['tenantReportDatesModal__listTxt']} ${styles['tenantReportDatesModal__listTxt_red']}`}>Пусто</p>
                        }
                    </div>
                </TransitionProvider>
            </NewPortalProvider>
        </>

    );
}

export default TenantReportDatesModal;