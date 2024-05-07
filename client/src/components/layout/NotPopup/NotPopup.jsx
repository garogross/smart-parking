import React, {useEffect, useRef} from 'react';
import styles from "./NotPopup.module.scss"
import NewPortalProvider from "../../../providers/NewPortalProvider";
import TransitionProvider from "../../../providers/TransitionProvider";
import Svg from "../Svg/Svg";
import {crossIcon} from "../../../assets/svg";

function NotPopup({onClose,text}) {
    const timeOutRef = useRef(null)
    const show = !!(text)
    const handleClose = () => {
        onClose()
        if(timeOutRef.current) clearTimeout(timeOutRef.current)
    }

    useEffect(() => {
        if(text) {
            timeOutRef.current = setTimeout(handleClose,3000)
        }
    }, [text]);

    return (
        <NewPortalProvider>
            <TransitionProvider
                style={'top'}
                inProp={show}
                className={styles["notPopup"]}
            >
                <div className={styles["notPopup__container"]}>
                    <p className={styles["notPopup__text"]}>
                        {text}
                    </p>
                    <button
                        className={styles["notPopup__btn"]}
                        onClick={handleClose}
                    >
                        <Svg id={crossIcon} className={styles["notPopup__crossIcon"]}/>
                    </button>
                </div>
            </TransitionProvider>
        </NewPortalProvider>
    );
}

export default NotPopup;