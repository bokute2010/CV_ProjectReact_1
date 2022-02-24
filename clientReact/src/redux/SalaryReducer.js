import * as ActionTypes from './ActionTypes';

export const Salaries = (state = {
    isLoading: true,
    errMess: null,
    salaries: []
}, action) => {
    switch (action.type) {
        // case ActionTypes.ADD_STAFFS_SALARY:
        //     return { ...state, isLoading: false, errMess: null, staffsSalary: action.payload }
        case ActionTypes.LOAD_SALARY:
            return {...state, isLoading: false, errMess: null, salaries: action.payload}
        case ActionTypes.SALARY_LOADING:
            return { ...state, isLoading: true, errMess: null, salaries: [] }
        case ActionTypes.SALARY_FAILED:
            return { ...state, isLoading: false, errMess: action.payload, salaries: [] }
            default:
            return state;
    }
}