import axios from 'axios';

const BASE_URL = '/api/users'

export const getUsers = () => {
  return axios
    .get(`${BASE_URL}/`)
    .then(response => response)
    .catch(err => console.log(err));
}

export const registerUser = (data) => {
  return axios
    .post(`${BASE_URL}/`, data)
    .then(response => response.data)
    .catch(err => err.response.data);
}

// const getUser = (id) => {
//   return axios
//     .get(`${BASE_URL}/${id}`)
//     .then(response => response)
//     .catch(err => console.log(err));
// }