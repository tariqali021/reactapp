import http from './http-service';
import { apiEndPoint } from '../config.json';

const customerEndPoint = apiEndPoint + '/users' ;


export function getAllCustomers() {
    return http.get(customerEndPoint);
}
  
export function getCustomer(id) {
    return http.get(customerEndPoint + '/' + id);
}

export function deleteCustomer(id){
    return http.delete(customerEndPoint + '/' + id);
}

export function saveCustomer(customer){
    return http.post(customerEndPoint , customer );
}

export function sortCustomers(sortBy, orderBy){
    return http.get(customerEndPoint + '/sort?column=' + sortBy + '&order=' + orderBy );
}

export function searchCustomer(text){
    return http.get(customerEndPoint + '/search?search=' + text);
}
