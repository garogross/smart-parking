import React from 'react';
import EditEmployeeForm from "../../components/EditEmployeePage/EditEmployeeForm/EditEmployeeForm";

function EditEmployeePage() {

    return (
        <div className={`gradientBg`}>
            <div className={'container topDistanceBlock'}>
                <EditEmployeeForm/>
            </div>
        </div>
    );
}

export default EditEmployeePage;