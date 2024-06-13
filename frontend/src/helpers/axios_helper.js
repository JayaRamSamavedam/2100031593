import axios from 'axios';
// import { setUser, setToken, logout } from '../features/authSlice';
// import { useSelector } from 'react-redux';
// import dotenv from 'dotenv';
// dotenv.config();


const globalurl="https://expressbackend-zsdf.onrender.com";
export const getAuthToken = () => {
    return window.localStorage.getItem('auth_token');
};

export const setAuthHeader = (token) => {
    window.localStorage.setItem('auth_token', token);
};


axios.defaults.baseURL = globalurl;
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const Request = (method, url, data) => {

    let headers = {};
    if (getAuthToken() !== null && getAuthToken() !== "null") {
        headers = {'Authorization': `Bearer ${getAuthToken()}`};
    }

    return axios({
        method: method,
        url: globalurl.concat(url),
        headers: headers,
        data:data,
    });
};