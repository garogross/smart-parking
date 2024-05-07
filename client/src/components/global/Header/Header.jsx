import React from 'react';
import Svg from "../../layout/Svg/Svg";
import {arrowDownIcon, backIcon} from "../../../assets/svg";
import {pageLimit} from "../../../constants";
import {formatNumber} from "../../../utils/functions/formatNumber";

import styles from "./Header.module.scss"
import {useNavigate} from "react-router-dom";

function Header({title, page, totalCount, showBackBtn}) {
    const navigate = useNavigate()

    let from = page === 1 ? 1 : (page - 1) * pageLimit + 1
    let to = page === 1 ? pageLimit : page * pageLimit

    if(to >= totalCount) to = totalCount

    if(page === 0) {
        from = 1
        to = totalCount
    }

    return (
        <div className={styles["header"]}>
            <div className={styles["header__titleBlock"]}>
                {showBackBtn ?
                    <button className={styles["header__backBtn"]} onClick={() => navigate((-1))}>
                        <Svg className={styles["header__backIcon"]} id={backIcon}/>
                        <span>Назад</span>
                    </button>
                    : null
                }
                <h5 className={styles["header__text"]}>
                    <span className={styles["header__whiteText"]}>Главная </span>
                    {title}
                </h5>
            </div>
            {
                totalCount ?
                    <p className={styles["header__text"]}>
                        {`Показаны ${from}-${to} из ${formatNumber(totalCount)} записи.`}
                    </p> : null
            }
        </div>
    );
}

export default Header;