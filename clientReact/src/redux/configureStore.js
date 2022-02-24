import { createStore, combineReducers, applyMiddleware } from "redux";

import { Staffs } from "./staffsReducer";
import { Departments } from "./departmentsReducer";
import { Salaries } from "./SalaryReducer";
import thunk from "redux-thunk";
import logger from "redux-logger";


export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            staffs: Staffs,
            departments: Departments,
            salaries: Salaries
            // staffsSalary: StaffsSalary
        }),
        applyMiddleware(thunk)

    );
    return store;
}