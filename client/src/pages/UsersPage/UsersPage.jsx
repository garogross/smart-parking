import React from 'react';
import UsersList from "../../components/UsersPage/UsersList/UsersList";

function UsersPage() {

    return (
        <div className={`gradientBg`}>
            <div className={'container topDistanceBlock'}>
                <UsersList/>
            </div>
        </div>
    );
}

export default UsersPage;