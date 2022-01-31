import * as ActionTypes from './ActionTypes';
import { baseURL } from '../shared/baseURL'


export const updateStaff = (staff) => dispatch => {
    dispatch(staffsLoading())
    return fetch(baseURL + 'staffs', {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(staff),
        credentials: 'same-origin'

    })
        .then(response => response.json())
        .then(staffs => dispatch(addStaffs(staffs)))
}

export const addStaff = (staff) => ({
    type: ActionTypes.ADD_NEWSTAFF,
    payload: staff
})

export const deleteStaff = (staffId) => dispatch => {
    dispatch(staffsLoading())
    return fetch(baseURL + 'staffs/' + staffId, {
        method: "DELETE",
        headers: {
            'Content-type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(staffs => dispatch(addStaffs(staffs)))

}



export const postStaff = (staff) => dispatch => {
    dispatch(staffsLoading())
    return fetch(baseURL + 'staffs', {
        method: "POST",
        body: JSON.stringify(staff),
        headers: {
            'Content-type': 'application/json'
        },
        credentials: 'same-origin'

    })
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errMess = new Error(error.message);
                throw errMess;
            })

        .then(response => response.json())
        .then(staff => dispatch(addStaff(staff)))
        .catch(error => dispatch(staffsFailed(error.message)))

}

export const fetchStaffs = () => dispatch => {
    dispatch(staffsLoading())

    return fetch(baseURL + 'staffs')
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errMess = new Error(error.message);
                throw errMess;
            })

        .then(response => response.json())
        .then(staffs => dispatch(addStaffs(staffs)))
        .catch(error => dispatch(staffsFailed(error.message)))
}

export const addStaffs = (staffs) => ({
    type: ActionTypes.ADD_STAFFS,
    payload: staffs
})

export const staffsLoading = () => ({
    type: ActionTypes.STAFFS_LOADING
})

export const staffsFailed = (errMess) => ({
    type: ActionTypes.STAFFS_FAILED,
    payload: errMess
})


export const fetchDepartments = () => dispatch => {
    dispatch(departmentsLoading());
    return fetch(baseURL + 'departments')
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errMess = new Error(error.message);
                throw errMess;
            })

        .then(response => response.json())
        .then(departments => dispatch(addDepartments(departments)))
        .catch(error => dispatch(departmentsFailed(error.message)))
}

export const addDepartments = (departments) => ({
    type: ActionTypes.ADD_DEPARTMENTS,
    payload: departments
})

export const departmentsLoading = () => ({
    type: ActionTypes.DEPARTMENTS_LOADING
})

export const departmentsFailed = (errMess) => ({
    type: ActionTypes.DEPARTMENTS_FAILED,
    payload: errMess
})

export const fetchStaffsSalary = () => dispatch => {
    dispatch(salaryLoading());
    return fetch(baseURL + 'staffsSalary')
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errMess = new Error(error.message);
                throw errMess;
            })

        .then(response => response.json())
        .then(staffsSalary => dispatch(addStaffsSalary(staffsSalary)))
        .catch(error => dispatch(salaryFailed(error.message)))

}

export const addStaffsSalary = (staffsSalary) => ({
    type: ActionTypes.ADD_STAFFS_SALARY,
    payload: staffsSalary
})

export const salaryLoading = () => ({
    type: ActionTypes.SALARY_LOADING
})
export const salaryFailed = (errMess) => ({
    type: ActionTypes.SALARY_FAILED,
    payload: errMess
})