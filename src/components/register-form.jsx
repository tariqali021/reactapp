import React, { Component } from 'react';
import Form from './common/form';
import TextField from "./common/FormElements/text-field";
import * as auth from '../services/auth';
import { toast } from 'react-toastify';

class RegisterForm extends Form {
    state = { 
        data : { name: '', email : '', password : '' },
        errors : {}
    };  

    doSubmit = async () => {
        console.log('submitting...')
        // save new movie
        const  user  = { ...this.state.data };
        const { data : result } = await auth.register(user);
        this.props.history.replace('/login');
        if(!result.error)
            toast.success(result.message);
        else
            toast.error(result.message);
    };

    render() { 
        const { name, email, password } = this.state.data;
        const { errors } = this.state;
        
        return ( 
            <form className="offset-4 col-4" onSubmit={this.handleSubmit}>
                {this.renderErrors(errors)}
                <TextField label="Name" type="text" name="name" value={name} onChange={this.handleChange} />
                <TextField label="Email Address" type="email" name="email" value={email} onChange={this.handleChange} />
                <TextField label="password" type="password" name="password" value={password} onChange={this.handleChange} />
                <button type="submit" className="btn btn-primary col-12">Register</button>
            </form>
         );
    }
}
 
export default RegisterForm;