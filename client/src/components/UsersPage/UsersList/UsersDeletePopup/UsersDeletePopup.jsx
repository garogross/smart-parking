import React from 'react';
import DeletePopup from "../../../global/DeletePopup/DeletePopup";
import {useDispatch, useSelector} from "react-redux";
import {deleteUser} from "../../../../redux/action/users";

function UsersDeletePopup({id,onClose,filters,onDeleteUserSuccess}) {
    const loading = useSelector(state => state.users.deleteLoading)
    const dispatch = useDispatch()

    const onDelete = () => {
        const clb = () => {
            onClose()
            onDeleteUserSuccess()
        }
        dispatch(deleteUser(id,filters,clb))
    }
    return (
        <DeletePopup
            id={id}
            onClose={onClose}
            title={'Удалить Пользователя'}
            loading={loading}
            onDelete={onDelete}
        />
    );
}

export default UsersDeletePopup;