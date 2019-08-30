import React, { Component } from "react";
import { getMovies, deleteMovie, toggleLike, searchMovie, getMoviesByGenre, sortMovies } from "../services/movieService";
import { getGenres } from "../services/genreService";
import Pagination from './common/pagination';
import {paginate} from "../utils/paginate";
import Filters from './common/filters';
import MoviesTable from './moviesTable';
import { Link } from "react-router-dom";
import SearchBox from '../components/common/FormElements/search';
import { toast } from "react-toastify";

class Movies extends Component {
    state = {
        movies: [],
        genres : [],
        pageSize : 4,
        currentPage : 1,
        selectedGenre : null,
        sortColumn : { sortBy:"title", orderBy:"asc" },
        searchQuery : ""
    };

    async componentDidMount(){
        const { data : allGenres } = await getGenres(); 
        const { data : allMovies } = await getMovies(); 
        const genres = [{name:"All Genres"}, ...allGenres];
        this.setState({
            movies : allMovies,
            genres,
            selectedGenre : { name:"All Genres" }

        });
    }

    handleDelete = async movie => {
        const { data : response } = await deleteMovie(movie._id);
        if(!response.error){
            this.setState({ movies : response.data });
            toast.error(response.message);
            if(!paginate(response.data, this.state.currentPage, this.state.pageSize).length){
                this.setState({currentPage:this.state.currentPage -1});
            }
        }
    };

    handleLike = async movie => {
        const { data : response } = await toggleLike(movie._id);
        this.setState({ movies : response.data });
    };

    handlePageChange = page => {
        this.setState({currentPage:page});
    };

    handleGenreChange = async genre => {
        const { data : response } = await getMoviesByGenre(genre._id);
        this.setState({selectedGenre : genre, searchQuery : "", currentPage:1, movies : response.data});
    };

    handleSort = async sortColumn => {
        const { data : response } = await sortMovies(sortColumn.sortBy, sortColumn.orderBy);
        sortColumn.orderBy = sortColumn.orderBy == 'asc' ? 'desc' : 'asc';
        this.setState({ sortColumn, movies : response.data });
    };

    handleSearch = async e => {
        const text = e.currentTarget.value;
        const genreId = this.state.selectedGenre._id ? this.state.selectedGenre._id : '';   
        const { data : response } = await searchMovie(genreId, text);
        this.setState({ movies : response.data, searchQuery : text, currentPage:1 });
    }

    render() {
        //const { length: count } = this.state.movies;
        const { currentPage, pageSize, movies:allMovies, genres, selectedGenre, sortColumn, searchQuery } = this.state;
        const filteredMovies = allMovies;
        const {length: countFilteredMovies} = filteredMovies; 
        const movies = paginate(allMovies, currentPage, pageSize);
        console.log(this.props.auth_user)
        
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
                            <SearchBox value={searchQuery} onSearch={this.handleSearch} />
                            { this.props.auth_user && <Link className = "btn btn-primary btn-sm" to="/movies/new">Add New</Link> }
                        </div>
                    </div>
                    <div class="row">
                        <MoviesTable 
                            movies = {movies} 
                            deleteMovie = {this.handleDelete} 
                            likeMovie = {this.handleLike} 
                            sortMovies = {this.handleSort} 
                            sortColumn = {sortColumn} 
                            auth_user = { this.props.auth_user}
                        /> 
                    </div>
                    <div class="row">
                        <div class="col-5 text-center">
                                <Pagination 
                                    itemsCount={countFilteredMovies} 
                                    pageSize={pageSize} 
                                    currentPage={currentPage} 
                                    onPageChange={this.handlePageChange}  
                                />
                        </div>
                        <div class="col-7 text-right">
                            <p>Showing {countFilteredMovies} movies in the database.</p>
                        </div>
                    </div>
                </div>
            </div>
        );
  }
}

export default Movies;
