import React from 'react';
import {useSelector} from "react-redux";
import LoadingPopup from "../../../layout/LoadingPopup/LoadingPopup";

function ParkingListResetLoading() {
    const resetLoading = useSelector(state => state.tenants.resetLoading)

    return (
        <LoadingPopup show={resetLoading}/>
    );
}

export default ParkingListResetLoading;