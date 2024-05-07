import React, {Fragment} from 'react';
import {useSelector} from "react-redux";
import {Link, NavLink, useLocation} from "react-router-dom";

import Svg from "../../../layout/Svg/Svg";

import styles from "./SideBar.module.scss"
import {
    employeesPagePath,
    historyPagePath,
    mainPagePath, reportPagePath, tenantsPagePath, usersPagePath,
} from "../../../../router/path";
import {
    historyIcon, parkingIcon, reportIcon, tenantIcon, usersIcon,
} from "../../../../assets/svg";
import {userRoles} from "../../../../constants";
import {navLogoImage} from "../../../../assets/images";
import CrossBtn from "../../../layout/CrossBtn/CrossBtn";

export const {tenant, admin, moderator, security} = userRoles

const navLinks = [
    {
        title: "Парковка",
        icon: parkingIcon,
        path: mainPagePath,
    },
    {
        title: "История посещений",
        icon: historyIcon,
        path: historyPagePath,
        onlyFor: [tenant, admin, moderator]
    },
    {
        title: "Арендаторы",
        icon: tenantIcon,
        path: tenantsPagePath,
        onlyFor: [admin, moderator]
    },
    {
        title: "Пользователи",
        path: usersPagePath,
        icon: usersIcon,
        onlyFor: [admin]
    },
    {
        title: "Мои Сотрудники",
        path: employeesPagePath,
        icon: usersIcon,
        onlyFor: [tenant]
    },
    {
        title: "Отчет",
        path: reportPagePath,
        icon: reportIcon,
        onlyFor: [admin]
    },
]

function SideBar({burgerOpened, onCloseBurger, isMobile}) {
    const user = useSelector(state => state.auth.user)


    const setActiveNavLinkClass = (defaultClass, activeClass) => {
        return ({isActive}) => (isActive ? `${defaultClass} ${activeClass}` : defaultClass)
    }

    const activeNavLinks = setActiveNavLinkClass(styles["sideBar__link"], styles["sideBar__link_active"])


    const renderNavLinks =
        navLinks
            .filter(item => !item.onlyFor || item.onlyFor.includes(user.role))
            .map(({
                      title,
                      icon,
                      path,
                      sublinks
                  }, index) => {

                    const linkPath = sublinks ? sublinks[0].path : path


                    return (
                        <Fragment key={index}>
                            <NavLink
                                to={linkPath}
                                className={activeNavLinks}
                            >
                                <Svg className={styles["sideBar__linkIcon"]} id={icon}/>
                                <span className={styles["sideBar__linkText"]}>{title}</span>
                            </NavLink>
                        </Fragment>
                    )
                }
            )

    return (
        <>
            <div
                className={`${styles["sideBar"]} ${burgerOpened ? styles["sideBar_active"] : null}`}
            >
                <Link
                    to={mainPagePath} onClick={isMobile ? onCloseBurger : null}
                    className={styles["sideBar__logoLink"]}>
                    <img src={navLogoImage} alt="Logo" className={styles["sideBar__logoImage"]}/>
                    <h1 className={styles["sideBar__logoText"]}>СМАРТ ПАРКОВКА</h1>
                </Link>
                {
                    burgerOpened ?
                        <CrossBtn btnClassName={styles["sideBar__crossBtn"]} onClick={onCloseBurger}/>
                        : null
                }
                <div className={`${styles["sideBar__menu"]} scrollbarDef`}>
                    {renderNavLinks}
                </div>
            </div>
        </>
    );
}

export default SideBar;