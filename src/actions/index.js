import axios from 'axios';
import {browserHistory} from 'react-router';
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, FETCH_MESSAGE, USER_INFO, UPDATE_USER, DELETE_USER } from './types';

const ROOT_URL = 'http://localhost:3000';
// const ROOT_URL = 'http://contact-card-api-garan.herokuapp.com';


export function loginUser({ email, password }) {
  return function(dispatch) {

    axios.post(`${ROOT_URL}/login`, { email, password })
      .then(response => {
        // console.log("login response: ", response);
        dispatch({ type: AUTH_USER});
        dispatch({ type: USER_INFO, payload: response.data });
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('email', response.data.email);
          browserHistory.push(`/contactcard/${response.data.id}`);
      })
      .catch(() => {
        dispatch(authError('Wrong Login Info'));
      });
  }; // end of dispatching function
}


export function signupUser({ email, password }) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/signup`, { email, password })
      .then(response => {
        console.log("signup response: ", response);
        dispatch({ type: AUTH_USER });
        dispatch({ type: USER_INFO, payload: response.data });
        localStorage.setItem('token', response.data.token);
        browserHistory.push(`/contactcard/${response.data.id}`);
      })
      .catch(response => dispatch(authError(response.data.error)));
  }
}


export function updateUser(id, {email, first_name, last_name, photo_url}) {
  return function(dispatch) {
    axios.put(`${ROOT_URL}/contactcard/${id}`, {email, first_name, last_name, photo_url})
      .then(response => {
        dispatch({ type: UPDATE_USER, payload: response.data.userInfo });
        // localStorage.setItem('token', response.data.token);
        browserHistory.push(`/contactcard/${id}`);
      })
      .catch(response => dispatch(authError(response.data.error)));
  }
}

// delete user
export function deleteUser({email}) {
  return function(dispatch) {
    axios.delete(`${ROOT_URL}/contactcard`, {email})
      .then(response => {
        localStorage.removeItem('token');
        dispatch({type: DELETE_USER});
        dispatch({ type: UNAUTH_USER });
        browserHistory.push('/');
      })
      .catch(response => dispatch(authError(response.data.error)));
  }
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

// {headers: {authorization: localStorage.getItem('token')}}

export function getUserInfo(id) {
  return function(dispatch) {
    axios.get(`${ROOT_URL}/contactcard/${id}`, {headers: {authorization: localStorage.getItem('token')}})
      .then(response => {
        // console.log('getUserInfo response: ', response);
        dispatch({ type: USER_INFO, payload: response.data.userInfo });
        browserHistory.push(`/contactcard/${id}`);
      })
      .catch(response => dispatch(authError(response.data.error)));
  }
}

// export function getUser(id){
//   axios.get(`${ROOT_URL}/contactcard/${id}`, {headers: {authorization: localStorage.getItem('token')}})
//     .then(response => {
//       console.log('getUser response: ', response);
//       return response;
//       // dispatch({ type: USER_INFO, payload: response.data.userInfo });
//       // browserHistory.push(`/contactcard/${id}`);
//     })
//     .catch(response => dispatch(authError(response.data.error)));
// }

// export function getUserInfo(id) {
//   return function(dispatch) {
//     axios.get(`${ROOT_URL}/contactcard/${id}`, {headers: {authorization: localStorage.getItem('token')}})
//       .then(response => {
//         console.log('getUserInfo response: ', response);
//         // browserHistory.push(`/contactcard/${id}`);
//         dispatch({ type: USER_INFO, payload: response.data.userInfo });
//         browserHistory.push(`/contactcard/${id}`);
//       })
//       .catch(response => dispatch(authError(response.data.error)));
//   }
// }

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

export function logoutUser() {
  localStorage.removeItem('token');

  return { type: UNAUTH_USER };
}

export function fetchMessage() {
  return function(dispatch) {
    axios.get(ROOT_URL, {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(response => {
        dispatch({
          type: FETCH_MESSAGE,
          payload: response.data.message
        });
      });
  }
}
