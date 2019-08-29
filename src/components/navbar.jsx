import React, { Component } from 'react';
import {Link, NavLink} from "react-router-dom";

const Navbar = ({ user }) => {
    
    return ( 
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-5">
            <Link className="navbar-brand" to="/">Store</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-between" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <NavLink className="nav-item nav-link" to="/movies">Movies</NavLink>
                    <NavLink className="nav-item nav-link" to="/customers">Customers</NavLink>
                </div>
                <div className="navbar-nav">
                    {
                        !user && 
                        <React.Fragment>
                            <Link className="nav-item nav-link" to="/login">Login</Link>
                            <Link className="nav-item nav-link" to="/register">Register</Link>
                        </React.Fragment>
                    }
                    {
                        user && 
                        <React.Fragment>
                            <Link className="nav-item nav-link" to="/profile">Profile</Link>
                            <Link className="nav-item nav-link" to="/logout">Logout</Link>
                        </React.Fragment>
                    }
                </div>
            </div>
        </nav>
     );
}
 
export default Navbar;