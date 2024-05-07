import React, {useEffect} from 'react';
import Header from "../../global/Header/Header";
import Form from "../../global/Form/Form";
import {setSelectValues} from "../../../utils/functions/setSelectValues";
import {userRoles} from "../../../constants";
import {useDispatch, useSelector} from "react-redux";
import {addUser, setAddUserError, setUsersPage} from "../../../redux/action/users";
import {useNavigate} from "react-router-dom";
import {usersPagePath} from "../../../router/path";
import {getTenantsNameList} from "../../../redux/action/tenants";
import {notPopupTexts} from "../../../utils/notPopupTexts";

const setSections = (nameList) =>  ([
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

        ]
    },
    {
        name: "Роль",
        cols: [
            [
                {
                    label: 'Роль*',
                    key: 'role',
                    selectValues: setSelectValues(userRoles)
                },

            ],
        ],
    },
    {
        name: "Пароль",
        cols: [
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
        ],
    },
    {
        name: "Организация",
        cols: [
            [
                {
                    label: 'Арендатор',
                    key: 'organization',
                    selectValues: nameList ? nameList.map(item => ({
                        value: item._id,
                        item: item.name,
                    })) : []
                },
            ],
        ],
    },
])

function CreateUserForm() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const loading = useSelector(state => state.users.addLoading)
    const getTenantsLoading = useSelector(state => state.tenants.getNameListLoading)
    const error = useSelector(state => state.users.addError)
    const tenantsNameList = useSelector(state => state.tenants.nameList)

    useEffect(() => {
        if (!tenantsNameList.length) dispatch(getTenantsNameList())
    }, []);

    const onSubmit = (formData) => {
        const clb = () => navigate(usersPagePath,{state: {notPopupText: notPopupTexts.user.add}})
        dispatch(setUsersPage())
        dispatch(addUser(formData, clb))
    }

    return (
        <>
            <Header
                showBackBtn={true}
                title={'> Создать Пользователь'}
            />
            <Form
                error={error}
                sections={setSections(tenantsNameList)}
                loading={loading}
                setError={setAddUserError}
                curItem={tenantsNameList}
                onSubmit={onSubmit}
                getLoading={getTenantsLoading}
            />
        </>
    );
}

export default CreateUserForm;