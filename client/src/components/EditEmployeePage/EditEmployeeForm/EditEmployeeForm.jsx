import React, {useEffect} from 'react';
import Header from "../../global/Header/Header";
import Form from "../../global/Form/Form";
import {userRoles} from "../../../constants";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {employeesPagePath, tenantEmployeesPagePath, tenantsPagePath} from "../../../router/path";
import {notPopupTexts} from "../../../utils/notPopupTexts";
import {editTenant, getOneTenant, setAddTenantError, setTenantsPage} from "../../../redux/action/tenants";
import {
    addEmployee,
    editEmployee,
    getOneEmployee,
    setAddEmployeeError, setEditEmployeeError,
    setEmployeesPage
} from "../../../redux/action/employees";
import {setEditFormSections} from "../../../utils/functions/setEditFormSections";
import {setEditUserError} from "../../../redux/action/users";

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

function EditEmployeeForm() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {id} = useParams()
    const user = useSelector(state => state.auth.user)
    const loading = useSelector(state => state.employees.editLoading)
    const getLoading = useSelector(state => state.employees.getLoading)
    const data = useSelector(state => state.employees.data)
    const error = useSelector(state => state.employees.editError)

    const curItem = data.find(item => item._id === id)
    const isTenant = user?.role === userRoles.tenant

    useEffect(() => {
        if (!curItem) dispatch(getOneEmployee(id))
    }, []);

    const onSubmit = (formData) => {
        const path = isTenant ? employeesPagePath : `${tenantEmployeesPagePath}/${curItem?.organization._id}`
        const clb = () => navigate(path,{state: {notPopupText: notPopupTexts.employee.edit}})
        dispatch(setEmployeesPage())
        dispatch(editEmployee(id,formData, clb))
    }

    return (
        <>
            <Header
                showBackBtn={true}
                title={'> Редактировать Сотрудник'}
            />
            <Form
                error={error}
                sections={setEditFormSections(sections,curItem)}
                loading={loading}
                setError={setEditEmployeeError}
                curItem={curItem}
                onSubmit={onSubmit}
                getLoading={getLoading}
            />
        </>
    );
}

export default EditEmployeeForm;