import React, {useEffect, useState} from 'react';
import Header from "../../global/Header/Header";
import Table from "../../global/Table/Table";
import HeaderActions from "../../global/HeaderActions/HeaderActions";
import {headerActionTypes} from "../../../constants";
import {flexCols, titles, setCols} from "./tableProps";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {createUserPagePath} from "../../../router/path";
import {getUsers, setUsersPage} from "../../../redux/action/users";
import {useDispatch, useSelector} from "react-redux";
import UsersDeletePopup from "./UsersDeletePopup/UsersDeletePopup";
import {notPopupTexts} from "../../../utils/notPopupTexts";
import NotPopup from "../../layout/NotPopup/NotPopup";


function UsersList() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {state} = useLocation()

    const data = useSelector(state => state.users.data)
    const totalCount = useSelector(state => state.users.totalCount)
    const curPage = useSelector(state => state.users.page)
    const getLoading = useSelector(state => state.users.getLoading)

    const [deleteItemId, setDeleteItemId] = useState(null)
    const [filters, setFilters] = useState({})
    const [notPopupText, setNotPopupText] = useState('')

    useEffect(() => {
        if (state?.notPopupText) setNotPopupText(state?.notPopupText)
    }, []);

    const onOpenDeletePopup = (id) => {
        setDeleteItemId(id)
    }
    const onCloseDeletePopup = () => setDeleteItemId(null)
    const onCloseNotPopup = () => setNotPopupText("")

    const onDeleteUserSuccess = () => {
        setNotPopupText(notPopupTexts.user.delete)
    }


    const getData = (filters, page) => {
        if (page !== curPage) dispatch(setUsersPage(page))
        dispatch(getUsers(filters))
    }

    const headerActions = [
        {
            key: headerActionTypes.add,
            props: {
                onClick: () => navigate(createUserPagePath)
            },
        },
        {
            key: headerActionTypes.refresh,
            props: {
                onClick: () => dispatch(getUsers()),
            },
        },
        {
            key: headerActionTypes.showAll,
            props: {
                onClick: () => getData(null, +!(curPage)),
                isPassive: +!(curPage)
            },
        },
    ]

    const cols = setCols(navigate, onOpenDeletePopup)
    return (
        <>
            <Header
                title={'> Пользователи'}
                totalCount={totalCount}
                page={curPage}
            />
            <HeaderActions actions={headerActions}/>
            <Table
                titles={titles}
                cols={cols}
                flexCols={flexCols}
                data={data}
                loading={getLoading}
                totalCount={totalCount}
                page={curPage}
                setFilters={setFilters}
                getData={getData}
            />
            <UsersDeletePopup
                id={deleteItemId}
                onClose={onCloseDeletePopup}
                filters={filters}
                onDeleteUserSuccess={onDeleteUserSuccess}
            />
            <NotPopup onClose={onCloseNotPopup} text={notPopupText}/>
        </>
    );
}

export default UsersList;