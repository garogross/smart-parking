import React from 'react';

import Loader from "../Loader/Loader";
import TransitionProvider from "../../../providers/TransitionProvider";
import Svg from "../Svg/Svg";

import {emptyIcon} from "../../../assets/svg";
import styles from "./DataLoader.module.scss";

function DataLoader({children, loading, isEmpty}) {
    return (
        <>
            <TransitionProvider
                inProp={isEmpty}
                style={'opacity'}
                className={`${styles["dataLoader"]} blackBox`}
            >
                {
                    !loading && isEmpty ?

                        <Svg className={styles["dataLoader__emptyIcon"]} id={emptyIcon}/>
                        :
                        <Loader size={80} borderSize={8}/>
                }
            </TransitionProvider>
            {!isEmpty ? children : null}
        </>
    );
}

export default DataLoader;