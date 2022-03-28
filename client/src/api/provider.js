import axios from 'axios';

export const getUserById = (id) => {
  return axios
    .get(`/api/users/${id}`)
    .then(response => response)
    .catch(err => console.log(err));
}

export const getUserByUsername = (username) => {
  return axios
    .get(`/api/users/${username}`)
    .then(response => response)
    .catch(err => console.log(err));
}

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