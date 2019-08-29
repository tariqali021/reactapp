import React, { Component } from 'react';
import Like from "./common/like";
import Table from "./common/table";
import { Link } from 'react-router-dom';
class MoviesTable extends Component {    
    
    componentDidMount() {
      if(this.props.auth_user){
        this.columns.push(this.deleteColumnContent());
      }
    }

    deleteColumnContent(){
     return {
              key: "delete",
              content: movie => (
                <button
                  onClick={() => this.props.deleteMovie(movie)}
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              )
            };
    }

    columns = [
        { path: "title" , label: "Title", content : movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link> },
        { path: "genre.name", label: "Genre" },
        { path: "numberInStock", label: "Stock" },
        { path: "dailyRentalRate", label: "Rate" },
        {
          key: "like",
          content: movie => (
            <Like liked={movie.liked} onClick={() => this.props.likeMovie(movie)} />
          )
        }
    ];
      
    render(){
      return ( 
          <Table columns={this.columns} data={this.props.movies} sortColumn={this.props.sortColumn} sortData={this.props.sortMovies} />
       );
    }
}
 
export default MoviesTable;