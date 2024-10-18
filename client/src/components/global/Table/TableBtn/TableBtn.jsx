import React, {memo} from 'react';

import styles from "./TableBtn.module.scss"

const TableBtn = memo(({className,isNegative,children,...properties}) => {
    return (
        <button
            className={`${styles["tableBtn"]} ${isNegative ? styles["tableBtn_negative"] : ''} ${className ? className : ''}`}
            {...properties}
        >{children}</button>
    );
})

export default TableBtn;