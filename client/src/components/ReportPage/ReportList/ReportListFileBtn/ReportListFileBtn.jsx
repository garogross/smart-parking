import React from 'react';
import TableBtn from "../../../global/Table/TableBtn/TableBtn";
import Svg from "../../../layout/Svg/Svg";
import styles from "./ReportListFileBtn.module.scss"
import {fileIcon} from "../../../../assets/svg";

function ReportListFileBtn(onClick) {
    return (
        <TableBtn
            className={styles['reportListFileBtn']}
            onClick={onClick}
        >
            <Svg id={fileIcon} className={styles['reportListFileBtn__icon']}/>
        </TableBtn>
    );
}

export default ReportListFileBtn;