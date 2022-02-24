import * as ActionTypes from '../ActionTypes';
import { baseURL } from '../../shared/baseURL';
import axios from 'axios';


export const updateStaff = (staff) => dispatch => {
    dispatch(staffsLoading())
    return fetch(baseURL + 'staffs', {
        method: 'PUT',
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

    return axios.post(baseURL + 'staffs', staff)
        .then(response => {
            if (response.status === 200) {
                //console.log(response)
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



