import React from 'react';
import MainList from "../../components/MainPage/MainList/MainList";
import {useSelector} from "react-redux";
import VideoPlayer from "../../components/MainPage/VideoPlayer/VideoPlayer";

function MainPage() {
    const user = useSelector(state => state.auth.user)

    return (
        <div className={`gradientBg`}>
            <div className={'container topDistanceBlock'}>
                <VideoPlayer/>
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