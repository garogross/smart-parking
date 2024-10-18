import React from 'react';
import TenantReportList from "../../components/TenantReportPage/TenantReportList/TenantReportList";

function TenantReportPage() {

    return (
        <div className={`gradientBg`}>
            <div className={'container topDistanceBlock'}>
                <TenantReportList/>
            </div>
        </div>
    );
}

export default TenantReportPage;