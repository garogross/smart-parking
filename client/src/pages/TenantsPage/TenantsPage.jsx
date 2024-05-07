import React from 'react';
import TenantsList from "../../components/TenantsPage/TenantsList/TenantsList";

function TenantsPage() {

    return (
        <div className={`gradientBg`}>
            <div className={'container topDistanceBlock'}>
                <TenantsList/>
            </div>
        </div>
    );
}

export default TenantsPage;