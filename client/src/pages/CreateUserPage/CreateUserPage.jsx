import React from 'react';
import CreateUserForm from "../../components/CreateUserPage/CreateUserForm/CreateUserForm";

function CreateUserPage() {

    return (
        <div className={`gradientBg`}>
            <div className={'container topDistanceBlock'}>
                <CreateUserForm/>
            </div>
        </div>
    );
}

export default CreateUserPage;