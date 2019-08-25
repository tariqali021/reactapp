import React from 'react';
import logo from './logo.svg';
import './App.css';
import Movies from './components/movies';

function App() {
  return (
    <div class="container">
      <div class="row">
        <div class="col">
          <Movies></Movies>
        </div>
      </div>
    </div>
  );
}

export default App;
