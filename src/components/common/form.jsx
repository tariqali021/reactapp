import React, { Component } from 'react';
import { isString } from 'util';

class Form extends Component {
    state = { 
        data : {},
        errors: {}
    }

    validate(){
        const errors = {};
        for(var key in this.schema){
            let rules = this.schema[key].split(":");
            rules.map( rule => {
                switch(rule){
                    case 'required':
                        if( isString(this.state.data[key]) && this.state.data[key].trim() === '') {
                            errors[key] = key.toUpperCase() + " is required.";
                        }
                    break; 
                }
            });
        }
        return errors;
    }

    handleSubmit = e => {
        e.preventDefault();
        const errors = this.validate();        
        this.setState({ errors:errors });
        if(!Object.keys(errors).length){
            this.doSubmit();
        }
    };
    
    handleChange = ({ currentTarget : el }) => {
        const data = {...this.state.data};
        console.log(data);
        console.log(el.name, el.value);
        data[el.name] = el.value;
        this.setState({ data })
    };

    renderErrors(errors){
        const errorClasses = !Object.keys(errors).length  ? "" : "alert alert-danger"; 
        return <div className={errorClasses}>
                    <ul>
                        {
                            Object.keys(errors).map( error => (
                                <li key={error}> { errors[error] } </li>
                            ))
                        }
                    </ul>
                </div>
    }

    renderField(){

    }
}
 
export default Form;