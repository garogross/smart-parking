import React from 'react';
import ProfileForm from "../../components/ProfilePage/ProfileForm/ProfileForm";

function ProfilePage() {

    return (
        <div className={`gradientBg`}>
            <div className={'container topDistanceBlock'}>
                <ProfileForm/>
            </div>
        </div>
    );
}

export default ProfilePage;