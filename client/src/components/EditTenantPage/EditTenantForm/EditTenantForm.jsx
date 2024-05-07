import React, {useEffect} from 'react';
import Header from "../../global/Header/Header";
import Form from "../../global/Form/Form";
import {setSelectValues} from "../../../utils/functions/setSelectValues";
import {tariffTypes} from "../../../constants";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {editUser, getOneUser, setEditUserError, setUsersPage} from "../../../redux/action/users";
import {tenantsPagePath, usersPagePath} from "../../../router/path";
import {notPopupTexts} from "../../../utils/notPopupTexts";
import {editTenant, getOneTenant, setTenantsPage} from "../../../redux/action/tenants";
import {setEditFormSections} from "../../../utils/functions/setEditFormSections";


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
                },
            ],
            [
                {
                    label: 'ИНН',
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

function EditTenantForm() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {id} = useParams()
    const loading = useSelector(state => state.tenants.editLoading)
    const getLoading = useSelector(state => state.tenants.getLoading)
    const data = useSelector(state => state.tenants.data)
    const error = useSelector(state => state.tenants.editError)

    const curItem = data.find(item => item._id === id)

    useEffect(() => {
        if (!curItem) dispatch(getOneTenant(id))
    }, []);

    const onSubmit = (formData) => {
        const clb = () => navigate(tenantsPagePath,{state: {notPopupText: notPopupTexts.tenant.edit}})
        dispatch(setTenantsPage())
        dispatch(editTenant(id,formData, clb))
    }

    return (
        <>
            <Header
                showBackBtn={true}
                title={'> Редактировать Арендатор'}
            />
            <Form
                error={error}
                sections={setEditFormSections(sections,curItem)}
                loading={loading}
                setError={setEditUserError}
                curItem={curItem}
                onSubmit={onSubmit}
                getLoading={getLoading}
            />
        </>
    );
}

export default EditTenantForm;