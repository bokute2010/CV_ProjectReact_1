import * as ActionTypes from '../ActionTypes';
import { baseURL } from '../../shared/baseURL';
import axios from 'axios';

export const deleteDepartment = (departmentId) => dispatch => {
    dispatch(departmentsLoading());
    return axios.delete(baseURL + `departments/${departmentId}`)
        .then(response => {
            if (response.status == 200) {
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

        .then(response => response.data)
        .then(departments => dispatch(addDepartments(departments)))
        .catch(error => dispatch(departmentsFailed(error.message)));
}

export const createDepartment = (department) => dispatch => {
    dispatch(departmentsLoading())
    return axios.post(baseURL + "departments", department)
        .then(response => {
            if (response.status == 200) {
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

        .then(response => response.data)
        .then(departments => dispatch(addDepartments(departments)))
        .catch(error => dispatch(departmentsFailed(error.message)))
}

export const fetchDepartments = () => dispatch => {
    dispatch(departmentsLoading());

    return axios(baseURL + 'departments')
        .then(response => {
            if (response.status == 200) {
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

        .then(response => response.data)
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
