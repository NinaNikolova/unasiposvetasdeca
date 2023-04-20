
import * as request from './requester';

const baseUrl ='https://unasiposvetasdeca-dgdi.vercel.app'; 
    

// const baseUrl = 'http://localhost:3030'; // TODO: Add server url when deployed
const url = `${baseUrl}/users`;

export const login = (data) => request.post(`${url}/login`, data)

export const register = (data) => request.post(`${url}/register`, data)

export const logout = () => request.get(`${url}/logout`)

export const getAll = () =>request.get(`${url}`)