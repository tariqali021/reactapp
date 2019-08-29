import http from './http-service';
import { apiEndPoint } from '../config.json';
import { getGenres } from './genreService';

export function getMovies() {
    return http.get(apiEndPoint + '/movies');
}
  
export function getMovie(id) {
    return http.get(apiEndPoint + '/movies/' + id)
}

export async function saveMovie(movie) {
    let movieInDb =  movie && movie._id ? movie : {};
    movieInDb.title = movie.title;
    const { data:genres } = await getGenres();
    movieInDb.genre =  genres.find(g => g._id === movie.genreId);
    movieInDb.numberInStock = parseInt(movie.numberInStock);
    movieInDb.dailyRentalRate = parseInt(movie.dailyRentalRate);
    return http.post(apiEndPoint + '/movies' , movieInDb );
}

export function deleteMovie(id){
    return http.delete(apiEndPoint + '/movies/'+ id);
}

export function toggleLike(id){
    return http.post(apiEndPoint + '/movies/like/' + id);
}

export function searchMovie(genreId, text){
    return http.get(apiEndPoint + '/movies/search?genreId=' + genreId + '&search=' + text);
}

export function sortMovies(sortBy, orderBy){
    return http.get(apiEndPoint + '/movies/sort?column=' + sortBy + '&order=' + orderBy );
}

export function getMoviesByGenre(genreId){ 
    genreId = genreId || 'all';
    return http.get(apiEndPoint + '/movies/genre/' + genreId);
}