import axios from 'axios';
import { handleResponse, handleError } from './response';

const BASE_URL = '/api/users'

export const getUsers = () => {
  return axios
    .get(`${BASE_URL}/`)
    .then(handleResponse)
    .catch(handleError);
}
// const getUser = (id) => {
//   return axios
//     .get(`${BASE_URL}/${id}`)
//     .then(handleResponse)
//     .catch(handleError);
// }