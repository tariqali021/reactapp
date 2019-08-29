import http from './http-service';
import { apiEndPoint } from '../config.json';

export function getGenres(){
    return http.get(apiEndPoint+'/genres');
}