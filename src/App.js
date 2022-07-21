import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  //  The movies state, passed as a prop to the MoviesList component
  const [movies, setMovies] = useState([]);

  // movies data loading state, triggered in fetchMoviesHandler
  const [isLoading, setIsLoading] = useState(false);
  
  /**
   * async fetchMoviesHandler function, uses the fetch method, 
   * which points at the star wars API URL.
   * triggered on the click event for the button returned in app.js
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
    setIsLoading(true);
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
        setIsLoading(false);
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && <p>Found no movies!</p>}
        {isLoading && <p>Loading...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
