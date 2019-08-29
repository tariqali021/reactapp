import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Navbar from "./components/navbar";
import Movies from "./components/movies";
import Customer from "./components/Customers/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/not-found";
import LoginForm from "./components/login-form";
import Logout from './components/logout';
import RegisterForm from "./components/register-form";
import MovieForm from './components/Movies/movie-form';
import CustomerForm from './components/Customers/customer-form';
import {ToastContainer, toast} from 'react-toastify';
import * as auth from "./services/auth";
import ProtectedRoute from "./components/common/protected-route";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  state = {
    user : null
  };

  componentDidMount() {   
    try{
      this.setState({ user : auth.user() });
    }catch(ex){}
  }

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <Navbar user={this.state.user} />
        <main className="container">
          <Switch>
            <ProtectedRoute path="/movies/:id" render={ (props) => <MovieForm {...props} /> } auth_user={this.state.user} />
            <Route path="/movies" render={ (props) => <Movies {...props} auth_user={this.state.user} /> } />
            <Route path="/customers/:id" component={CustomerForm} />
            <Route path="/customers" component={Customer} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/movies" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
