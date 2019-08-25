import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Navbar from "./components/navbar";
import Movies from "./components/movies";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import MovieDetail from "./components/movie-detail";
import "./App.css";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <main className="container">
          <Switch>
            <Route path="/movies/:id" component={MovieDetail} />
            <Route path="/movies" component={Movies} />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
