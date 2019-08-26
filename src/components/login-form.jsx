import React, { Component } from 'react';
import TextField from "./common/FormElements/text-field";
import Form from './common/form';

class LoginForm extends Form {
    state = { 
        data : { email : '', password : '' },
        errors : {}
    };

    schema = {
        email: "required",
        password: "required"
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