import React from 'react';
import HistoryList from "../../components/HistoryPage/HistoryList/HistoryList";
import {useSelector} from "react-redux";

function HistoryPage() {
    const user = useSelector(state => state.auth.user)

    return (
        <div className={`gradientBg`}>
            <div className={'container topDistanceBlock'}>
                {user ? <HistoryList/> : null}
            </div>
        </div>
    );
}

export default HistoryPage;