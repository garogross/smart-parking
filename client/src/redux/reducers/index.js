import {combineReducers} from "redux"
import {authReducer} from "./authReducer";
import {usersReducer} from "./usersReducer";
import {tenantsReducer} from "./tenantsReducer";
import {employeesReducer} from "./employeesReducer";
import {parkingReducer} from "./parkingReducer";
import {historyReducer} from "./historyReducer";

export default combineReducers({
    auth: authReducer,
    users: usersReducer,
    tenants: tenantsReducer,
    employees: employeesReducer,
    parking: parkingReducer,
    history: historyReducer,
})