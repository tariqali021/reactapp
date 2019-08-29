import React, { Component } from 'react';
import Form from "../common/form";
import TextField from '../common/FormElements/text-field';
import SelectField from '../common/FormElements/select';
import { getGenres } from '../../services/genreService';
import { saveMovie, getMovie } from '../../services/movieService';
import { toast } from 'react-toastify';


class MovieForm extends Form {
    state = { 
        data : { title: '', genreId : '', numberInStock : '', dailyRentalRate:'' },
        errors : {},
        genres : []
    };
   
    async componentDidMount(){
        const {data} = await getGenres();
        this.setState({ genres : data });
        const movieId = this.props.match.params.id;
        if(movieId === 'new') return;
        
        // Edit form
        const { data : { data : movie } } = await getMovie(movieId);
        console.log(data);
        if(!movie) return this.props.history.replace('/not-found');

        this.setState({ data : this.mapToViewModel(movie) });
    }

    mapToViewModel = movie => {
        return {
            _id : movie._id,
            title : movie.title,
            genreId : movie.genre._id,
            numberInStock : movie.numberInStock,
            dailyRentalRate : movie.dailyRentalRate
        }
    };

    doSubmit = async () => {
        console.log('submitting...')
        // save new movie
        const  movie  = { ...this.state.data };
        const { data : result } = await saveMovie(movie);
        this.props.history.replace('/movies');
        if(!result.error)
            toast.success(result.message);
        else
            toast.error(result.message);
    };

    render() { 
        const { title, genreId, numberInStock, dailyRentalRate } = this.state.data;
        const { errors, genres } = this.state;
        return ( 
            <form className="offset-4 col-4" onSubmit={this.handleSubmit}>
                {this.renderErrors(errors)}
                <TextField label="Title" type="text" name="title" value={title} onChange={this.handleChange} />
                <TextField label="Number in Stock" type="number" name="numberInStock" value={numberInStock} onChange={this.handleChange} />
                <SelectField label="Genre" name="genreId" options={genres} selectedItem = {genreId} onChange={this.handleChange} />
                <TextField label="Rate" type="number" name="dailyRentalRate" value={dailyRentalRate} onChange={this.handleChange} />
                <button type="submit" className="btn btn-primary col-12">Save</button>
            </form>
         );
    }
}
 
export default MovieForm;