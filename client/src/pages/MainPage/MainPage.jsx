import React from 'react';
import MainList from "../../components/MainPage/MainList/MainList";
import {useSelector} from "react-redux";

function MainPage() {
    const user = useSelector(state => state.auth.user)

    return (
        <div className={`gradientBg`}>
            <div className={'container topDistanceBlock'}>
                {
                    user ?
                        <MainList/>
                        : null
                }
            </div>
        </div>
    );
}

export default MainPage;