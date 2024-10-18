import React from 'react';
import AddTenantForm from "../../components/CreateTenantPage/AddTenantForm/AddTenantForm";

function CreateTenantPage() {

    return (
        <div className={`gradientBg`}>
            <div className={'container topDistanceBlock'}>
                <AddTenantForm/>
            </div>
        </div>
    );
}

export default CreateTenantPage;