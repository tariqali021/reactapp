import React, { Component } from 'react';
import TextField from "./common/FormElements/text-field";
import Form from './common/form';
import { toast } from 'react-toastify';
import * as auth from '../services/auth';


class LoginForm extends Form {
    state = { 
        data : { email : '', password : '' },
        errors : {}
    }; 

    componentDidMount() {
        if(auth.user()){
            this.props.history.replace('/');
        }
    }

    doSubmit = async () => {
        console.log('submitting...')
        // save new movie
        const  user  = { ...this.state.data };
        const { data : result } = await auth.login(user); // error;
        const  { data : token } = result;
        if(!result.error){
            auth.storeToken(token);
            const {state} = this.props.location;
            window.location = state ? state.from.pathname : '/';
        }else{
            toast.error(result.message);
        }
    };

    render() { 
        const { email, password } = this.state.data;
        const { errors } = this.state;
        
        return ( 
            <form className="offset-4 col-4" onSubmit={this.handleSubmit}>
                {this.renderErrors(errors)}
                <TextField label="Email Address" type="email" name="email" value={email} onChange={this.handleChange} />
                <TextField label="password" type="password" name="password" value={password} onChange={this.handleChange} />
                <button type="submit" className="btn btn-primary col-12">Login</button>
            </form>
         );
    }
}
 
export default LoginForm;