import { createStore, combineReducers, applyMiddleware } from "redux";

import { Staffs } from "./staffsReducer";
import { Departments } from "./departmentsReducer";
import { StaffsSalary } from "./SalaryReducer";
import thunk from "redux-thunk";
import logger from "redux-logger";


export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            staffs: Staffs,
            departments: Departments,
            staffsSalary: StaffsSalary
        }),
        applyMiddleware(thunk, logger)

    );
    return store;
}