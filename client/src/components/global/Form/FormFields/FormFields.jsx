import React, {Fragment} from 'react';
import SecondaryBtn from "../../../layout/SecondaryBtn/SecondaryBtn";
import MainBtn from "../../../layout/MainBtn/MainBtn";
import {useFormValue} from "../../../../hooks/useFormValue";
import Svg from "../../../layout/Svg/Svg";
import {crossIcon} from "../../../../assets/svg";
import Select from "../../../layout/Select/Select";
import MainInput from "../../../layout/MainInput/MainInput";

import styles from "../Form.module.scss";
import {formatDate} from "../../../../utils/functions/date";

function FormFields({
                        setError,
                        error,
                        sections,
                        onSubmit
                    }) {


    const initialState = sections
        .filter(item => !item.sectionKey)
        .flatMap(item => item.cols)
        .flat()
        .reduce((acc, cur) => {
            const value = cur.type === 'date' ? formatDate(cur.value, true) : cur.value
            acc[cur.key] = value || ""
            return acc
        }, {})

    const dynamicSections = sections
        .filter(item => item.sectionKey)
        .reduce((acc, cur) => {
            if (cur.values) acc[cur.sectionKey] = cur.values
            else acc[cur.sectionKey] = []
            return acc
        }, {})
    const {
        formData,
        onChange,
        setFormData,
        clearInputError
    } = useFormValue({...initialState, ...dynamicSections}, setError, error)
    const onSubmitForm = (e) => {
        e.preventDefault()
        onSubmit(formData)
    }
    const onChangeSelect = (key, value) => {
        setFormData(prevState => ({
            ...prevState,
            [key]: value
        }))
        clearInputError(key)
    }


    const onAddDynamicSection = (cols, sectionKey) => {
        const newItem = cols.flat().reduce((acc, cur) => {
            acc[cur.key] = ""
            return acc
        }, {})

        setFormData(prevState => ({
            ...prevState,
            [sectionKey]: [...formData[sectionKey], newItem]
        }))
    }
    const renderFields = (cols, sectionKey, sectionKeyIndex) => {

        const onDeleteField = () => {
            setFormData(prevState => {
                const filtredFields = prevState[sectionKey].filter((_, index) => index !== sectionKeyIndex)
                return {
                    ...prevState,
                    [sectionKey]: filtredFields
                }
            })
        }

        return (
            <div
                className={
                    `${styles["form__fields"]} ` +
                    `${sectionKey ? styles["form__fields_dynamic"] : ""} ` +
                    `${sectionKey && error?.[sectionKey] ? styles["form__fields_dynamicInvalid"] : ""} `
                }>
                {
                    sectionKey ?
                        <button className={styles["form__crossBtn"]} onClick={onDeleteField}>
                            <Svg className={styles["form__crossIcon"]} id={crossIcon}/>
                        </button> : null
                }
                {
                    cols.map((col, index) => (
                        <div
                            key={index}
                            className={styles["form__col"]}
                        >
                            {
                                col
                                    .filter(item => !item.filter || item.filter(formData))
                                    .map(({
                                             label,
                                             type,
                                             key,
                                             className,
                                             selectValues
                                         }, index) => {

                                    const value = sectionKey ? formData[sectionKey][sectionKeyIndex][key] : formData[key]

                                    const onChangeDynamicField = (e) => {
                                        setFormData(prevState => {
                                            const dataCopy = [...prevState[sectionKey]]
                                            dataCopy[sectionKeyIndex] = {
                                                ...dataCopy[sectionKeyIndex],
                                                [e.target.name]: e.target.value
                                            }
                                            return {
                                                ...prevState,
                                                [sectionKey]: dataCopy
                                            }
                                        })
                                        clearInputError(e.target.name)
                                    }

                                    const val = sectionKey ? formData[sectionKey][sectionKeyIndex][key] : formData[key]

                                    const selectedValueProp = formData[key] && selectValues ?
                                        selectValues.find(item => item.value === formData[key])
                                        : null
                                    const errorState = sectionKey && !error?.[key] === val ? error?.[key] && !value : error?.[key]

                                    return (
                                        <div
                                            key={index}
                                            className={
                                                `${styles["form__field"]} ` +
                                                `${selectValues ? styles["form__field_small"] : ""}`}
                                        >
                                            <p className={`${styles["form__labelText"]} contentTxt`}>{label}</p>
                                            {
                                                selectValues ?
                                                    <Select
                                                        isInvalid={error?.[key]}
                                                        disableState={false}
                                                        valuesArr={selectValues}
                                                        className={`mainInput mainInput_small ${styles["form__select"]}`}
                                                        selectedValueProp={selectedValueProp}
                                                        onChange={(value) => onChangeSelect(key, value)}
                                                        name={'Пусто'}
                                                    /> :
                                                    <MainInput
                                                        type={type || "text"}
                                                        isInvalid={errorState}
                                                        value={val}
                                                        onChange={sectionKey ? onChangeDynamicField : onChange}
                                                        name={key}
                                                        className={`mainInput_small ${className ? className : ""}`}
                                                    />
                                            }

                                        </div>
                                    )
                                })
                            }
                        </div>
                    ))
                }
            </div>
        )
    }


    return (
        <div className={`${styles["form"]} blackBox`}>
            <form
                className={styles["form__main"]}
                onSubmit={onSubmitForm}
            >
                <p className={`${styles["form__infoText"]} contentTxt`}>Поля помеченные * -
                    обязательные</p>
                {
                    sections.map(({name, cols, sectionKey}, index) => (
                        <div className={styles["form__section"]} key={index}>
                            <h6 className={styles["form__sectionTitle"]}>{name}</h6>
                            {
                                sectionKey
                                    ? formData[sectionKey].map((item, index) => {
                                        return (
                                            <Fragment key={index}>
                                                {renderFields(cols, sectionKey, index)}
                                            </Fragment>
                                        )
                                    })
                                    : renderFields(cols, sectionKey)
                            }
                            {
                                sectionKey ?
                                    <SecondaryBtn
                                        type={'button'}
                                        onClick={() => onAddDynamicSection(cols, sectionKey)}
                                        className={styles["form__addBtn"]}>Добавить</SecondaryBtn>
                                    : null
                            }

                        </div>
                    ))
                }
                <MainBtn
                    type={"submit"}
                    className={`${styles["form__btn"]} ${styles["form__saveBtn"]}`}>Сохранить</MainBtn>
            </form>
        </div>
    );
}

export default FormFields;