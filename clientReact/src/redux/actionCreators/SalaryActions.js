import * as ActionTypes from '../ActionTypes';
import { baseURL } from '../../shared/baseURL';
import axios from 'axios';

export const deleteSalary = (salaryId) => dispatch => {
    dispatch(salaryLoading());

    return axios.delete(baseURL + `salaries/${salaryId}`)
        .then(response =>{
            if(response.status == 200){
                return response;
            }else{
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            
            
        }}, error => {
            var errMess = new Error(error.message);
            throw errMess;
        })
        .then(response => response.data)
        .then(salaries => dispatch(loadSalary(salaries)))
        .catch(error => dispatch(salaryFailed(error.message)));
}       

export const createSalary = (salaryInfo) => dispatch => {
    dispatch(salaryLoading());
    return axios.post(baseURL + 'salaries', salaryInfo)
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
        .then(staffsSalary => dispatch(loadSalary(staffsSalary)))
        .catch(error => dispatch(salaryFailed(error.message)))
}

export const getSalary = () => dispatch => {
    dispatch(salaryLoading);
    return (
        axios.get(baseURL + "salaries")
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
            .then(salaries => dispatch(loadSalary(salaries)))
            .catch(error => dispatch(salaryFailed(error.message)))
    )
}

export const loadSalary = (salaries) => ({
    type: ActionTypes.LOAD_SALARY,
    payload: salaries
})

// export const fetchSalary = () => dispatch => {
//     dispatch(salaryLoading());
//     return fetch(baseURL + 'staffs')
//         .then(response => {
//             if (response.ok) {
//                 return response;
//             } else {
//                 var error = new Error('Error ' + response.status + ': ' + response.statusText);
//                 error.response = response;
//                 throw error;
//             }
//         },
//             error => {
//                 var errMess = new Error(error.message);
//                 throw errMess;
//             })

//         .then(response => response.json())
//         .then(staffsSalary => dispatch(addStaffsSalary(staffsSalary)))
//         .catch(error => dispatch(salaryFailed(error.message)))
// }



export const addStaffsSalary = (salaries) => ({
    type: ActionTypes.ADD_STAFFS_SALARY,
    payload: salaries
})

export const salaryLoading = () => ({
    type: ActionTypes.SALARY_LOADING
})
export const salaryFailed = (errMess) => ({
    type: ActionTypes.SALARY_FAILED,
    payload: errMess
})