import React from 'react';
import DeletePopup from "../../../global/DeletePopup/DeletePopup";
import {useDispatch, useSelector} from "react-redux";
import {deleteTenant} from "../../../../redux/action/tenants";
import {deleteEmployee} from "../../../../redux/action/employees";

function EmployeesDeletePopup({id,onClose,filters,onDeleteUserSuccess}) {
    const loading = useSelector(state => state.employees.deleteLoading)
    const dispatch = useDispatch()

    const onDelete = () => {
        const clb = () => {
            onClose()
            onDeleteUserSuccess()
        }
        dispatch(deleteEmployee(id,filters,clb))
    }

    return (
        <DeletePopup
            id={id}
            onClose={onClose}
            title={'Удалить арендатора'}
            loading={loading}
            onDelete={onDelete}
        />
    );
}

export default EmployeesDeletePopup;