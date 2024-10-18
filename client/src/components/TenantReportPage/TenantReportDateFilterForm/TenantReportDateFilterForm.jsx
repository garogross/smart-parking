import React from 'react';
import {useFormValue} from "../../../hooks/useFormValue";

import styles from "./TenantReportDateFilterForm.module.scss"
import MainInput from "../../layout/MainInput/MainInput";
import MainBtn from "../../layout/MainBtn/MainBtn";
import {useDispatch} from "react-redux";
import {getTenantReport} from "../../../redux/action/tenants";
import {useParams} from "react-router-dom";
function TenantReportDateFilterForm({setDatesFilter}) {
    const dispatch = useDispatch()
    const params = useParams()

    const {onChange,formData,onResetForm} = useFormValue({
        dateFrom: "",
        dateTo: "",
    })


    const onFilter = (e) => {
        e.preventDefault()
        dispatch(getTenantReport(params.id,formData))
        setDatesFilter(formData)
    }

    const onReset = () => {
        onResetForm()
        dispatch(getTenantReport(params.id,null))
        setDatesFilter(formData)
    }

    return (
        <form onSubmit={onFilter} className={styles['tenantReportDateFilterForm']}>
            <h4 className={styles['tenantReportDateFilterForm__title']}>Фильтровать дату</h4>
            <div className={styles['tenantReportDateFilterForm__fields']}>
                <label htmlFor={"dateFrom"} className={`subtitleTxt ${styles['tenantReportDateFilterForm__label']}`}>С</label>
                <MainInput
                    id={"dateFrom"}
                    value={formData.dateFrom}
                    onChange={onChange}
                    name={"dateFrom"}
                    type={"date"}
                />
                <label htmlFor={'dateTo'} className={`subtitleTxt ${styles['tenantReportDateFilterForm__label']}`}>До</label>
                <MainInput
                    id={"dateTo"}
                    value={formData.dateTo}
                    onChange={onChange}
                    name={"dateTo"}
                    placeholder={'До'}
                    type={"date"}
                />
            </div>
            <div className={styles['tenantReportDateFilterForm__buttons']}>
                <MainBtn
                    type={"submit"}
                >
                    Филтровать
                </MainBtn>
                <MainBtn
                    type={"button"}
                    isPassive={true}
                    onClick={onReset}
                >
                    Сброс
                </MainBtn>
            </div>
        </form>
    );
}

export default TenantReportDateFilterForm;