import React from 'react';
import ReportList from "../../components/ReportPage/ReportList/ReportList";

function ReportPage() {

    return (
        <div className={`gradientBg`}>
            <div className={'container topDistanceBlock'}>
                <ReportList/>
            </div>
        </div>
    );
}

export default ReportPage;