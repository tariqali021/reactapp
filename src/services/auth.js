import jwtDecode from 'jwt-decode';
import http from './http-service';
import { apiEndPoint } from '../config.json';


export function register(user){
    return http.post(apiEndPoint + '/register' , user);
}

export function login(user){
    return http.post(apiEndPoint + '/login' , user).then(res => res) // success
    .catch(err => err.response);
                
}

export function storeToken(token){
    localStorage.setItem('token' , token);
}

export function user(){
    if(localStorage.getItem('token') != null)
        return jwtDecode(localStorage.getItem('token'));
    return null;
}

export function logout(){
    return http.post(apiEndPoint + '/logout', null, http.headers());
}

export default {
    register : register,
    storeToken : storeToken,
    user : user
}