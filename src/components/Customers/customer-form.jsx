import React, { Component } from 'react';
import Form from "../common/form";
import TextField from '../common/FormElements/text-field';
import * as customers from '../../services/customers';
import { toast } from 'react-toastify';


class CustomerForm extends Form {
    state = { 
        data : { name: '', email : '' },
        errors : {}
    };
   
    async componentDidMount(){
        const customerId = this.props.match.params.id;
        const { data : response } = await customers.getCustomer(customerId);
        const  { data : customer } = response;
        if(!customer) return this.props.history.replace('/not-found');

        this.setState({ data : this.mapToViewModel(customer) });
    }

    mapToViewModel = customer => {
        return {
            _id : customer._id,
            name : customer.name,
            email : customer.email,
        }
    };

    doSubmit = async () => {
        console.log('submitting...')
        // save new customer
        const  customer  = { ...this.state.data };
        const { data : result } = await customers.saveCustomer(customer);
        this.props.history.replace('/customers');
        if(!result.error)
            toast.success(result.message);
        else
            toast.error(result.message);
    };

    render() { 
        const { name, email } = this.state.data;
        const { errors } = this.state;
        return ( 
            <form className="offset-4 col-4" onSubmit={this.handleSubmit}>
                {this.renderErrors(errors)}
                <TextField label="Name" type="text" name="name" value={name} onChange={this.handleChange} />
                <TextField label="Email" type="email" name="email" value={email} onChange={this.handleChange} />
                <button type="submit" className="btn btn-primary col-12">Update</button>
            </form>
         );
    }
}
 
export default CustomerForm;