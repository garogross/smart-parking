import React, {useEffect} from 'react';
import Header from "../../global/Header/Header";
import Form from "../../global/Form/Form";
import {setSelectValues} from "../../../utils/functions/setSelectValues";
import {userRoles} from "../../../constants";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {usersPagePath} from "../../../router/path";
import {
    editUser,
    getOneUser,
    setEditUserError,
    setUsersPage
} from "../../../redux/action/users";
import {notPopupTexts} from "../../../utils/notPopupTexts";
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
                },
                {
                    label: 'Повторите пароль*',
                    key: 'passwordConfirm',
                },

            ],
        ],
    },
]




function EditUserForm() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {id} = useParams()
    const loading = useSelector(state => state.users.editLoading)
    const getLoading = useSelector(state => state.users.getLoading)
    const data = useSelector(state => state.users.data)
    const error = useSelector(state => state.users.editError)

    const curItem = data.find(item => item._id === id)

    useEffect(() => {
        if (!curItem) dispatch(getOneUser(id))
    }, []);

    const onSubmit = (formData) => {
        const clb = () => navigate(usersPagePath,{state: {notPopupText: notPopupTexts.user.edit}})
        dispatch(setUsersPage())
        dispatch(editUser(id,formData, clb))
    }


    return (
        <>
            <Header
                showBackBtn={true}
                title={'> Редактировать Пользователя'}
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

export default EditUserForm;