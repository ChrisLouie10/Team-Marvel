import axios from 'axios';

const BASE_URL = '/api/users'

export const getUsers = () => {
  return axios
    .get(`${BASE_URL}/`)
    .then(response => response)
    .catch(err => console.log(err));
}

// const getUser = (id) => {
//   return axios
//     .get(`${BASE_URL}/${id}`)
//     .then(response => response)
//     .catch(err => console.log(err));
// }