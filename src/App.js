import React, { Component } from "react";
import logo from "./logo.svg";
import "./assets/css/app.css";

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      movies: []
    }
  }

  getMovies = async () => {
    const LIST_MOVIES = "http://www.omdbapi.com/?s=avengers&apikey=ce58f4c8";
    let response = await fetch(LIST_MOVIES);
    let data = await response.json();
    return data;
  };

  componentWillMount = async() => {
    console.log('componentWillMount');
    await this.getMovies().then(data => this.setState({movies: data.Search}));
  };

  listMovies = (movies) => {
    console.log('movies', movies);
    if (movies == null) return;
    return movies.map((movie, idx) =>
      <li key={idx} className="movies__itens">
        <figure>
          <img src={movie.Poster} alt={`Movies  movie.Title`} className="responsive-img" />
          <figcaption>{movie.Title}</figcaption>
        </figure>
      </li>
    );
  }

  render() {

    const {movies} = this.state; 

    return (
      <div className="app">
        <header className="header">
          <div>
            <img src={logo} className="app-logo" alt="logo" />
            <h1>webflix</h1>
          </div>
        </header>
        <main>
          <div className="container">
            <ul className="movies">{this.listMovies(movies)}</ul>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
