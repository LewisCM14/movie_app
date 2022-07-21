import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  //  The movies state, passed as a prop to the MoviesList component
  const [movies, setMovies] = useState([]);
  
  /**
   * async fetchMoviesHandler function, uses the fetch method, 
   * which points at the star wars API URL.
   * fetch defaults to a GET request and returns a promise.
   * 'await' the promise to be delivered in the response object,
   * the json data returned from the star wars api, 
   * is then converted to a JavaScript object in this response,
   * 'await' this data conversion,
   * then map the data into the transformedMovies object,
   * translating the fields as named in the star wars api to suit the application naming convention,
   * updates the 'movies' state to the transformedMovies data via the setMovies method.
   */
   async function fetchMoviesHandler() {
    const response = await fetch('https://swapi.py4e.com/api/films')
    const data = await response.json();
        const transformedMovies = data.results.map((movieData) => {
          return {
            id: movieData.episode_id,
            title: movieData.title,
            openingText: movieData.opening_crawl,
            releaseDate: movieData.release_date,
          };
        });
        setMovies(transformedMovies);
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
