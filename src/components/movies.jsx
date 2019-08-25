import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from './common/pagination';
import {paginate} from "../utils/paginate";
import Filters from './common/filters';
import MoviesTable from './moviesTable';

class Movies extends Component {
    state = {
        movies: [],
        genres : [],
        pageSize : 4,
        currentPage : 1,
        selectedGenre : null,
        sortColumn : { sortBy:"title", orderBy:"asc" }
    };

    componentDidMount(){
        const genres = [{name:"All Genres"}, ...getGenres()];
        this.setState({
            movies : getMovies(),
            genres
        });
    }

    handleDelete = movie => {
        const movies = this.state.movies.filter(m => m._id !== movie._id);
        this.setState({ movies });
        if(!paginate(movies, this.state.currentPage, this.state.pageSize).length){
            this.setState({currentPage:this.state.currentPage -1});
        }
    };

    handleLike = movie => {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = { ...movies[index] };
        movies[index].liked = !movies[index].liked;
        this.setState({ movies });
    };

    handlePageChange = page => {
        this.setState({currentPage:page});
    };

    handleGenreChange = genre => {
        this.setState({selectedGenre : genre, currentPage:1});
    };

    handleSort = sortColumn => {
        this.setState({ sortColumn });
    };

    render() {
        const { length: count } = this.state.movies;
        const { currentPage, pageSize, movies:allMovies, genres, selectedGenre, sortColumn } = this.state;

        if (count === 0) return <p>There are no movies in the database.</p>;
        
        const filteredMovies = selectedGenre && selectedGenre._id ? allMovies.filter(m => m.genre._id === selectedGenre._id) : allMovies;
        const {length: countFilteredMovies} = filteredMovies; 
        const movies = paginate(filteredMovies, currentPage, pageSize);
        return (
            <div class="row">
                <div class="col-3">
                    <h4>Filter Movies</h4>
                    <Filters 
                        items = {genres} 
                        selectedItem ={selectedGenre} 
                        onItemSelect = {this.handleGenreChange} 
                        dataCollection = {allMovies}
                    />
                </div>
                <div class="col">
                    <div class="row">
                        <div class="col-3">
                            <h4>Movies List</h4> 
                        </div>
                        <div class="col-9 text-right">
                            <p>Showing {countFilteredMovies} movies in the database.</p>
                        </div>
                    </div>
                    <div class="row">
                        <MoviesTable 
                            movies = {movies} 
                            deleteMovie = {this.handleDelete} 
                            likeMovie = {this.handleLike} 
                            sortMovies = {this.handleSort} 
                            sortColumn = {sortColumn}
                        /> 
                    </div>
                    <div class="row">
                        <div class="col text-center">
                                <Pagination 
                                    itemsCount={countFilteredMovies} 
                                    pageSize={pageSize} 
                                    currentPage={currentPage} 
                                    onPageChange={this.handlePageChange}  
                                />
                        </div>
                    </div>
                </div>
            </div>
        );
  }
}

export default Movies;