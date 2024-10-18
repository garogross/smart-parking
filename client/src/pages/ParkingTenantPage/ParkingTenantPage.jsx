import React from 'react';
import ParkingList from "../../components/ParkingPage/ParkingList/ParkingList";
import {useSelector} from "react-redux";

function ParkingTenantPage() {
    const user = useSelector(state => state.auth.user)

    return (
        <div className={`gradientBg`}>
            <div className={'container topDistanceBlock'}>
                {
                    user ?
                        <ParkingList/>
                        : null
                }
            </div>
        </div>
    );
}

export default ParkingTenantPage;