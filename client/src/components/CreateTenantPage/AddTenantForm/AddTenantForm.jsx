import React from 'react';
import Header from "../../global/Header/Header";
import Form from "../../global/Form/Form";
import {setSelectValues} from "../../../utils/functions/setSelectValues";
import {tariffTypes} from "../../../constants";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {addTenant, setAddTenantError, setTenantsPage} from "../../../redux/action/tenants";
import {tenantsPagePath} from "../../../router/path";
import {notPopupTexts} from "../../../utils/notPopupTexts";

const sections = [
    {
        name: "Организация",
        cols: [
            [
                {
                    label: 'Наименование*',
                    key: 'name',
                },
                {
                    label: 'Количество выделяемых машиномест*',
                    key: 'allowedCarCount',
                    type: 'number'
                },
            ],
            [
                {
                    label: 'ИНН*',
                    key: 'tin',
                },
                {
                    label: 'БИК',
                    key: 'bic',
                },
                {
                    label: 'Адресс',
                    key: 'address',
                },
            ]

        ]
    },
    {
        name: "Реквизиты банка",
        cols: [
            [
                {
                    label: 'Наименование банка',
                    key: 'bankName',
                },
                {
                    label: 'Расчётный счёт',
                    key: 'checkingAccount',
                },
            ],
        ]
    },
    {
        name: "Авторизация",
        cols: [
            [
                {
                    label: 'Имя*',
                    key: 'firstName',
                },
                {
                    label: 'Фамилия*',
                    key: 'lastName',
                },
            ],
            [
                {
                    label: 'Отчество',
                    key: 'patronymic',
                },
                {
                    label: 'Логин*',
                    key: 'username',
                },
            ],
            [
                {
                    label: 'E-mail*',
                    key: 'email',
                },
                {
                    label: 'Контактный телефон',
                    key: 'phoneNumber',
                },
            ],
            [
                {
                    label: 'Пароль*',
                    key: 'password',
                    type: 'password'
                },
                {
                    label: 'Повторите пароль*',
                    key: 'passwordConfirm',
                    type: 'password'
                },
            ],
        ]
    },
    {
        name: "Тариф",
        cols: [
            [
                {
                    label: 'Тариф*',
                    key: 'tariff',
                    selectValues: setSelectValues(tariffTypes)
                },
            ],
        ]
    },
]

function AddTenantForm(props) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const loading = useSelector(state => state.tenants.addLoading)
    const error = useSelector(state => state.tenants.addError)


    const onSubmit = (formData) => {
        const clb = () => navigate(tenantsPagePath,{state: {notPopupText: notPopupTexts.tenant.add}})
        dispatch(setTenantsPage())
        dispatch(addTenant(formData, clb))
    }

    return (
        <>
            <Header
                showBackBtn={true}
                title={'> Создать Арендатор'}
            />
            <Form
                error={error}
                sections={sections}
                setError={setAddTenantError}
                curItem={true}
                onSubmit={onSubmit}
                loading={loading}
            />
        </>
    );
}

export default AddTenantForm;