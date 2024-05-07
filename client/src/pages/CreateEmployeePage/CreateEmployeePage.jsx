import React from 'react';
import CreateEmployeeForm from "../../components/CreateEmployeePage/CreateEmployeeForm/CreateEmployeeForm";

function CreateEmployeePage() {

    return (
        <div className={`gradientBg`}>
            <div className={'container topDistanceBlock'}>
                <CreateEmployeeForm/>
            </div>
        </div>
    );
}

export default CreateEmployeePage;