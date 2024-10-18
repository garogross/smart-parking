import React from 'react';

import styles from "./TenantReportInfo.module.scss"
import {monthsInRussian, tariffTypes} from "../../../constants";

const info = [
    {
        title: "Арендатор",
        key: "name"
    },
    {
        title: "Тарифф",
        key: "tariff"
    },
    {
        title: "Количество выделенных мест",
        key: "allowedCarCount"
    },
    {
        title: "Ставка",
        key: "costOfHour"
    },
]

function TenantReportInfo({tenant}) {


    return (
        <div className={styles['tenantReportInfo']}>
            {
                tenant && info.map(item => (
                    <div key={item.key} className={styles['tenantReportInfo__box']}>
                        <h6 className={styles['tenantReportInfo__boxTitle']}>{item.title}:</h6>
                        {
                            item.key !== "costOfHour" || tenant.tariff === tariffTypes.guest
                                ? <p className={styles['tenantReportInfo__boxTxt']}>{tenant[item.key]}</p>
                                : <div className={styles['tenantReportInfo__monthList']}>

                                    {
                                        monthsInRussian.map(({name, key}) => (
                                        <p className={styles['tenantReportInfo__boxTxt']}>
                                            {name} - {tenant.costOfMonth[key]}
                                        </p>
                            ))
                        }
                    </div>

            }
        </div>
    )
)
}
</div>
)
    ;
}

export default TenantReportInfo;