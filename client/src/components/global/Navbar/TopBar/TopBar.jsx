import React, {useEffect, useState} from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";

import Svg from "../../../layout/Svg/Svg";

import styles from "./TopBar.module.scss"
import {burgerIcon, logOutIcon} from "../../../../assets/svg";
import {navLogoImage} from "../../../../assets/images";
import {loginPagePath, mainPagePath, profilePagePath} from "../../../../router/path";
import SecondaryBtn from "../../../layout/SecondaryBtn/SecondaryBtn";
import {useDispatch, useSelector} from "react-redux";
import {logOut} from "../../../../redux/action/auth";
import {formatFullName} from "../../../../utils/functions/formatFullName";

function TopBar({burgerOpened,onToggleBurger}) {
    const dispatch = useDispatch()
    const {fullName} = useSelector(state => state.auth.user)
    const navigate = useNavigate()

    const onLogOut = () => {
        const clb = () => navigate(loginPagePath)
        dispatch(logOut(clb))
    }

    return (
        <>
        <div className={
            `${styles["topBar"]} `+
            `${burgerOpened ? styles["topBar_burgerOpened"] : ""} `
        }>
                <div style={{flex: 1}}>
                    <button
                        className={styles["topBar__burgerBtn"]}
                        onClick={onToggleBurger}
                    >
                        <Svg
                            id={burgerIcon}
                            className={styles["topBar__burgerIcon"]}
                        />
                    </button>
                </div>
            <div className={styles['topBar__authBlock']}>
                    <Link
                        title={'Иванвов Иван'}
                        to={profilePagePath}
                        className={styles["topBar__usernameBtn"]}>{formatFullName(fullName)}</Link>
                <SecondaryBtn
                    className={styles["topBar__logoutBtnDesk"]}
                    onClick={onLogOut}
                >Выйти</SecondaryBtn>
                <button
                    className={styles["topBar__logoutBtnMob"]}
                    // onClick={onLogOut}
                >
                    <Svg className={styles["topBar__logoutIcon"]} id={logOutIcon}/>
                </button>
            </div>
        </div>
        </>
    );
}

export default TopBar;