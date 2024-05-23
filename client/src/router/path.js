import React from "react";
import {Navigate} from "react-router-dom";

import PrivateRoute from "./PrivateRoute";
import LoginPage from "../pages/LoginPage/LoginPage";
import MainPage from "../pages/MainPage/MainPage";
import HistoryPage from "../pages/HistoryPage/HistoryPage";
import TenantsPage from "../pages/TenantsPage/TenantsPage";
import CreateTenantPage from "../pages/CreateTenantPage/CreateTenantPage";
import EditEmployeePage from "../pages/EditEmployeePage/EditEmployeePage";
import UsersPage from "../pages/UsersPage/UsersPage";
import CreateUserPage from "../pages/CreateUserPage/CreateUserPage";
import EditUserPage from "../pages/EditUserPage/EditUserPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import ReportPage from "../pages/ReportPage/ReportPage";
import EditTenantPage from "../pages/EditTenantPage/EditTenantPage";
import CreateEmployeePage from "../pages/CreateEmployeePage/CreateEmployeePage";

import {userRoles} from "../constants";
import EmployeesPage from "../pages/EmployeesPage/EmployeesPage";
import TenantReportPage from "../pages/TenantReportPage/TenantReportPage";

export const mainPagePath = '/'
export const loginPagePath = '/login'
export const createEmployeePagePath = "/employee/create"
export const createTenantEmployeePagePath = "/tenant/employee/create"
export const createTenantPagePath = "/tenant/create"
export const createUserPagePath = "/user/create"
export const editEmployeePagePath = "/employee/edit"
export const editTenantPagePath = "/tenant/edit"
export const editUserPagePath = "/user/edit"
export const employeesPagePath = "/employees"
export const tenantEmployeesPagePath = "/tenant/employees"
export const historyPagePath = "/history"
export const profilePagePath = "/profile"
export const reportPagePath = "/report"
export const rolesPagePath = "/roles"
export const tenantsPagePath = "/tenants"
export const usersPagePath = "/users"


const {tenant,admin,moderator} = userRoles

export const routes = [
    {
        path: loginPagePath,
        component: <PrivateRoute element={<LoginPage/>} noAuth={true}/>
    },
    {
        path: mainPagePath,
        component:  <PrivateRoute element={<MainPage/>}/>
    },
    {
        path: historyPagePath,
        component:  <PrivateRoute element={<HistoryPage/>} roles={[tenant,admin,moderator]}/>
    },
    {
        path: tenantsPagePath,
        component:  <PrivateRoute element={<TenantsPage/>} roles={[admin,moderator]}/>
    },
    {
        path: createTenantPagePath,
        component:  <PrivateRoute element={<CreateTenantPage/>} roles={[admin,moderator]}/>
    },
    {
        path: createEmployeePagePath,
        component: <PrivateRoute
            element={
                <PrivateRoute element={<CreateEmployeePage/>} roles={[tenant]}/>
            }
        />,
        children: [
            {
                path: ":id",
                component: <PrivateRoute element={<CreateEmployeePage/>} roles={[admin,moderator]}/>
            }
        ]
    },
    {
        path: editTenantPagePath,
        component: <PrivateRoute
            element={
                <Navigate
                    to={mainPagePath}
                    replace={true}
                />
            }
        />,
        children: [
            {
                path: ":id",
                component: <EditTenantPage/> //<PrivateRoute element={<EditTenantPage/>} roles={[admin,moderator]}/>
            }
        ]
    },
    {
        path: editEmployeePagePath,
        component: <PrivateRoute
            element={
                <Navigate
                    to={mainPagePath}
                    replace={true}
                />
            }
        />,
        children: [
            {
                path: ":id",
                component: <PrivateRoute element={<EditEmployeePage/>} roles={[tenant,admin,moderator]}/>
            }
        ]
    },
    {
        path: employeesPagePath,
        component: <PrivateRoute element={<EmployeesPage/>} roles={tenant}/>
    },
    {
        path: tenantEmployeesPagePath,
        component: <PrivateRoute
            element={
                <Navigate
                    to={mainPagePath}
                    replace={true}
                />
            }
        />,
        children: [
            {
                path: ":id",
                component:  <PrivateRoute element={<EmployeesPage/>} roles={[admin,moderator]}/>
            }
        ]
    },
    {
        path: createTenantEmployeePagePath,
        component: <PrivateRoute
            element={
                <Navigate
                    to={mainPagePath}
                    replace={true}
                />
            }
        />,
        children: [
            {
                path: ":id",
                component: <PrivateRoute element={<EditEmployeePage/>} roles={[admin,moderator]}/>
            }
        ]
    },
    {
        path: usersPagePath,
        component:  <PrivateRoute element={<UsersPage/>} roles={[admin]}/>
    },
    {
        path: createUserPagePath,
        component:  <PrivateRoute element={<CreateUserPage/>} roles={[admin]}/>
    },
    {
        path: editUserPagePath,
        component: <PrivateRoute
            element={
                <Navigate
                    to={mainPagePath}
                    replace={true}
                />
            }
        />,
        children: [
            {
                path: ":id",
                component:  <PrivateRoute element={<EditUserPage/>} roles={[admin]}/>
            }
        ]
    },
    {
        path: profilePagePath,
        component:  <PrivateRoute element={<ProfilePage/>}/>
    },
    {
        path: reportPagePath,
        component:  <PrivateRoute element={<ReportPage/>} roles={[admin]}/>,
        children: [
            {
                path: ":id",
                component:  <PrivateRoute element={<TenantReportPage/>} roles={[admin]}/>
            }
        ]
    },
    // //
    {
        path: '*',
        component: <ErrorPage/>
    },
]