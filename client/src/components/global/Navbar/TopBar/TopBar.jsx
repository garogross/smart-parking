import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logOut, signOutForeignAccount } from "../../../../redux/action/auth";

import SecondaryBtn from "../../../layout/SecondaryBtn/SecondaryBtn";
import Svg from "../../../layout/Svg/Svg";

import {
  burgerIcon,
  logOutIcon,
  switchAccountIcon,
} from "../../../../assets/svg";
import {
  historyPagePath,
  loginPagePath,
  profilePagePath,
} from "../../../../router/path";
import { formatFullName } from "../../../../utils/functions/formatFullName";
import { lsProps } from "../../../../utils/lsProps";
import styles from "./TopBar.module.scss";

function TopBar({ burgerOpened, onToggleBurger }) {
  const dispatch = useDispatch();
  const { fullName } = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const onLogOut = () => {
    const clb = () => navigate(loginPagePath);
    dispatch(logOut(clb));
  };

  return (
    <>
      <div
        className={
          `${styles["topBar"]} ` +
          `${burgerOpened ? styles["topBar_burgerOpened"] : ""} `
        }
      >
        <div style={{ flex: 1 }}>
          <button
            className={styles["topBar__burgerBtn"]}
            onClick={onToggleBurger}
          >
            <Svg id={burgerIcon} className={styles["topBar__burgerIcon"]} />
          </button>
        </div>
        <div className={styles["topBar__authBlock"]}>
          <Link
            title={"Иванвов Иван"}
            to={profilePagePath}
            className={styles["topBar__usernameBtn"]}
          >
            {formatFullName(fullName)}
          </Link>
          {!!sessionStorage.getItem(lsProps.token) && (
            <button
              onClick={() =>
                dispatch(signOutForeignAccount(() => navigate(historyPagePath)))
              }
              className={styles["topBar__swithAccountBtn"]}
            >
              <Svg
                id={switchAccountIcon}
                className={styles["topBar__swithAccountIcon"]}
              />
            </button>
          )}
          <SecondaryBtn
            className={styles["topBar__logoutBtnDesk"]}
            onClick={onLogOut}
          >
            Выйти
          </SecondaryBtn>
          <button className={styles["topBar__logoutBtnMob"]} onClick={onLogOut}>
            <Svg className={styles["topBar__logoutIcon"]} id={logOutIcon} />
          </button>
        </div>
      </div>
    </>
  );
}

export default TopBar;
