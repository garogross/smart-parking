import React from 'react';
import TableBtn from "../../../global/Table/TableBtn/TableBtn";
import Svg from "../../../layout/Svg/Svg";
import styles from "./ReportListFileBtn.module.scss"
import {fileIcon} from "../../../../assets/svg";
import {useNavigate} from "react-router-dom";
import {reportPagePath} from "../../../../router/path";

function ReportListFileBtn({id}) {
    const navigate = useNavigate()
    return (
        <TableBtn
            className={styles['reportListFileBtn']}
            onClick={() => navigate(`${reportPagePath}/${id}`)}
        >
            <Svg id={fileIcon} className={styles['reportListFileBtn__icon']}/>
        </TableBtn>
    );
}

export default ReportListFileBtn;