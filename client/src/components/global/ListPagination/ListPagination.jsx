import React from 'react';
import Pagination from "react-js-pagination";

import styles from "./ListPagination.module.scss"
import {pageLimit} from "../../../constants";

function ListPagination({totalCount, curPage, onPageChange}) {

    return (
        <>
            {
                totalCount > pageLimit && curPage !== 0 ?
                    <div className={styles['pagination']}>
                        <Pagination
                            activePage={curPage}
                            itemsCountPerPage={pageLimit}
                            totalItemsCount={totalCount}
                            pageRangeDisplayed={6}
                            onChange={onPageChange}

                            itemClassFirst={`${styles['pagination__item_arrow']} ${styles['pagination__item_first']}`}
                            itemClassLast={`${styles['pagination__item_arrow']} ${styles['pagination__item_last']}`}
                            linkClassFirst={styles['pagination__link_icon']}
                            linkClassLast={styles['pagination__link_icon']}
                            linkClassPrev={styles['pagination__link_icon']}
                            linkClassNext={styles['pagination__link_icon']}
                            itemClassPrev={`${styles['pagination__item_arrow']} ${styles['pagination__item_prev']}`}
                            itemClassNext={`${styles['pagination__item_arrow']} ${styles['pagination__item_next']}`}
                            disabledClass={styles['pagination__item_disabled']}
                            activeLinkClass={styles['pagination__link_active']}
                            activeClass={styles['pagination__item_active']}
                            linkClass={styles['pagination__link']}
                            innerClass={styles['pagination__container']}
                            itemClass={styles['pagination__item']}
                        />
                    </div> :
                    null
            }
        </>

    );
}

export default ListPagination;