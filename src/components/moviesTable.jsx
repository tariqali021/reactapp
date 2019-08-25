import React, { Component } from 'react';
import Like from "./common/like";
import Table from "./common/table";
import { Link } from 'react-router-dom';
const MoviesTable = (props) => {
    const { movies, likeMovie, deleteMovie, sortMovies, sortColumn } = props;
    const columns = [
        { path: "title" , label: "Title", content : movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link> },
        { path: "genre.name", label: "Genre" },
        { path: "numberInStock", label: "Stock" },
        { path: "dailyRentalRate", label: "Rate" },
        {
          key: "like",
          content: movie => (
            <Like liked={movie.liked} onClick={() => likeMovie(movie)} />
          )
        },
        {
          key: "delete",
          content: movie => (
            <button
              onClick={() => deleteMovie(movie)}
              className="btn btn-danger btn-sm"
            >
              Delete
            </button>
          )
        }
    ];
        
    return ( 
        <Table columns={columns} data={movies} sortColumn={sortColumn} sortData={sortMovies} />
     );
}
 
export default MoviesTable;