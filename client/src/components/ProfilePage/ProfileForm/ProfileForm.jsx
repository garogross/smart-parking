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
import {setUpdateProfileError, updateProfile} from "../../../redux/action/auth";
import {setEditFormSections} from "../../../utils/functions/setEditFormSections";

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
]


function ProfileForm() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.user)
    const loading = useSelector(state => state.auth.updateProfileLoading)
    const error = useSelector(state => state.auth.updateProfileError)

    const onSubmit = (formData) => {
        dispatch(updateProfile(formData))
    }

    return (
        <>
            <Header
                showBackBtn={true}
                title={'> Редактировать Профиль'}
            />
            <Form
                error={error}
                sections={setEditFormSections(sections,user)}
                loading={loading}
                setError={setUpdateProfileError}
                curItem={user}
                onSubmit={onSubmit}
                getLoading={false}
            />
        </>
    );
}

export default ProfileForm;