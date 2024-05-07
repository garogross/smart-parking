import React from 'react';
import Header from "../../global/Header/Header";
import Form from "../../global/Form/Form";
import {userRoles} from "../../../constants";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {employeesPagePath, tenantEmployeesPagePath} from "../../../router/path";
import {notPopupTexts} from "../../../utils/notPopupTexts";
import {setAddTenantError} from "../../../redux/action/tenants";
import {addEmployee, setAddEmployeeError, setEmployeesPage} from "../../../redux/action/employees";

const sections = [
    {
        name: "Профиль",
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
                    label: 'Контактный телефон*',
                    key: 'phoneNumber',
                },
            ]

        ]
    },
    {
        name: "Машины",
        sectionKey: "cars",
        cols: [
            [
                {
                    label: 'Номер автомобиля',
                    key: 'plateNumber',
                },
                {
                    label: 'Модель автомобиля',
                    key: 'model',
                },
                {
                    label: 'Цвет автомобиля',
                    key: 'color',
                },
            ],
            [
                {
                    label: 'VIN',
                    key: 'vin',
                },
                {
                    label: 'Пропуск с',
                    key: 'passFrom',
                    type: 'date'
                },
                {
                    label: 'До',
                    key: 'passTo',
                    type: 'date'
                },
            ],

        ],
    },
]

function CreateEmployeeForm() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()

    const user = useSelector(state => state.auth.user)
    const loading = useSelector(state => state.employees.addLoading)
    const error = useSelector(state => state.employees.addError)

    const isTenant = user?.role === userRoles.tenant
    const id = isTenant ? user?.organization : params.id
    const onSubmit = (formData) => {
        const clb = () => {
            const path = isTenant ? employeesPagePath : `${tenantEmployeesPagePath}/${id}`
            navigate(path, {state: {notPopupText: notPopupTexts.tenant.add}})
        }
        dispatch(setEmployeesPage())
        dispatch(addEmployee({...formData,organization: id}, clb))
    }

    return (
        <>
            <Header
                showBackBtn={true}
                title={'> Создать Сотрудник'}
            />
            <Form
                error={error}
                sections={sections}
                setError={setAddEmployeeError}
                curItem={true}
                onSubmit={onSubmit}
                loading={loading}
            />
        </>
    );
}

export default CreateEmployeeForm;