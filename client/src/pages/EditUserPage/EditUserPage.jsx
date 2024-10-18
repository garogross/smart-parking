import React from 'react';
import EditUserForm from "../../components/EditUserPage/EditUserForm/EditUserForm";

function EditUserPage() {

    return (
        <div className={`gradientBg`}>
            <div className={'container topDistanceBlock'}>
                <EditUserForm/>
            </div>
        </div>
    );
}

export default EditUserPage;