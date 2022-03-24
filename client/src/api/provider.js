import axios from 'axios';

// const BASE_URL = '/api/users'

export const getUsers = () => {
  return axios
    .get(`/api/users`)
    .then(response => response);
}

export const registerUser = (data) => {
  return axios
    .post(`/api/users`, data)
    .then(response => response);
}

export const loginAuth = (data) => {
  return axios
    .post(`/api/users/login`, data)
    .then(response => response);
}

// const getUser = (id) => {
//   return axios
//     .get(`${BASE_URL}/${id}`)
//     .then(response => response)
//     .catch(err => console.log(err));
// }