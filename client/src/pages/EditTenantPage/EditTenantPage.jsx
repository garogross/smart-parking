import React from 'react';
import EditTenantForm from "../../components/EditTenantPage/EditTenantForm/EditTenantForm";

function EditTenantPage() {

    return (
        <div className={`gradientBg`}>
            <div className={'container topDistanceBlock'}>
                <EditTenantForm/>
            </div>
        </div>
    );
}

export default EditTenantPage;