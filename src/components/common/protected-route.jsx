import React, { Component } from 'react';
import {Route, Redirect} from 'react-router-dom';
import {toast} from 'react-toastify';
import * as auth from '../../services/auth';

const ProtectedRoute = ({ path, Component:Component, auth_user, render, ...rest }) => {
    
    return ( 
        <Route              
            render= { 
                (props) => {
                    if(!auth.user()) { 
                        toast.info('Please login to perform this action.');
                            return <Redirect to={
                                {
                                    pathname : '/login',
                                    state : { from: props.location }
                                }
                            } 
                        />
                    }
                    return Component ? Component : render(props) ;
                } 
            } 
            {...rest}
        />
    );
}
 
export default ProtectedRoute;