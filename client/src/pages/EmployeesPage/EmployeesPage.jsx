import React from 'react';
import UsersList from "../../components/UsersPage/UsersList/UsersList";
import EmployeesList from "../../components/EmployeesPage/EmployeesList/EmployeesList";
import {useSelector} from "react-redux";

function EmployeesPage() {
    const user = useSelector(state => state.auth.user)

    return (
        <div className={`gradientBg`}>
            <div className={'container topDistanceBlock'}>
                {user ? <EmployeesList/> : null}
            </div>
        </div>
    );
}

export default EmployeesPage;