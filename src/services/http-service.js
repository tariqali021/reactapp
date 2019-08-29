import axios from 'axios'; // An HTTP Service
import { toast } from 'react-toastify'; // A notification Component

axios.interceptors.response.use(null, error => { // Globally handles responses for axios requests

    // Expected error means it can be client error like [ 404: Not Found, 400: Bad Request]
    const expectedError = error.response && error.response.status >= 400 && error.response.status < 500 ;

    if(!expectedError){
        toast.error('An unexpected error occured.');
    }

    return Promise.reject(error); // rejected promise for request
});

function headers(token){
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
}


export default {
    get : axios.get,
    post : axios.post,
    delete : axios.delete,
    put : axios.put,
    patch : axios.patch,
    headers : headers
};