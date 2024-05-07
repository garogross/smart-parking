import React, {Fragment, useEffect, useRef, useState} from 'react';
import styles from "./HeaderActions.module.scss"
import MainBtn from "../../layout/MainBtn/MainBtn";
import Svg from "../../layout/Svg/Svg";
import {downloadIcon, refreshIcon} from "../../../assets/svg";
import {downloadFileFormats} from "../../../constants";
import TransitionProvider from "../../../providers/TransitionProvider";
import {onClickOutSide} from "../../../utils/functions/onClickOutSide";
import {baseUrl, proxy} from "../../../redux/action/fetchTools";

const IconBtn = ({icon, className, ...properties}) => (
    <button
        {...properties}
        className={`${styles['headerActions__iconBtn']} ${className ? className : ""}`}
    >
        <Svg className={styles['headerActions__icon']} id={icon}/>
    </button>
)

const DownloadBtn = ({downloadUrl,fileName, ...properties}) => {
    const [isPopupOpened,setIsPopupOpened] = useState(false)
    const popupRef = useRef(null)

    useEffect(() => {
        onClickOutSide([popupRef], closePopup, isPopupOpened)
    }, [isPopupOpened]);

    const togglePopup = () => setIsPopupOpened(prevState => !prevState)
    const closePopup = () => setIsPopupOpened(false)
    return (
        <>
            <div className={styles["headerActions__downloadBtn"]} ref={popupRef}>
                <IconBtn onClick={togglePopup} {...properties}/>
                <TransitionProvider
                    className={styles["headerActions__downloadPopup"]}
                    inProp={isPopupOpened}
                    style={'opacity'}
                >
                    {
                        downloadFileFormats.map((item, index) => (
                            <a
                                href={proxy+baseUrl+downloadUrl+item}
                                download={`${fileName}.${item.key}`}
                                className={styles['headerActions__downloadLink']}
                                key={index}
                            >
                                <Svg className={styles['headerActions__downloadLinkIcon']} id={item.key}/>
                                <span>{item.name}</span>
                            </a>
                        ))
                    }
                </TransitionProvider>
            </div>
        </>
    )
}

function HeaderActions({actions}) {


    const actionBtns = {
        showAll: (props) => (
            <MainBtn
                className={styles['headerActions__mainBtn']}
                {...props}
                isPassive={props.isPassive}
            >Показать Все</MainBtn>
        ),
        add: (props) => (
            <MainBtn
                className={styles['headerActions__mainBtn']}
                {...props}
            >Добавить</MainBtn>
        ),
        refresh: (props) => (
            <IconBtn
                {...props}
                icon={refreshIcon}
            />
        ),
        download: (props) => (
            <DownloadBtn
                icon={downloadIcon}
                {...props}
                className={styles['headerActions__iconBtn_passive']}
            />
        ),
    }


    return (
        <>
            <div className={styles["headerActions"]}>
                {
                    actions.map(({key, props}, index) => (
                        <Fragment key={index}>
                            {actionBtns[key](props)}
                        </Fragment>
                    ))
                }
            </div>
        </>
    );
}

export default HeaderActions;