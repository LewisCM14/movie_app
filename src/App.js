import React, { useState, useEffect, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import AddMovie from './components/AddMovie';
import "./App.css";

function App() {
  //  The movies state, passed as a prop to the MoviesList component
  const [movies, setMovies] = useState([]);

  // movies data loading state, triggered in fetchMoviesHandler
  const [isLoading, setIsLoading] = useState(false);

  // HTTP error state handler
  const [error, setError] = useState(null);

  /**
   * async fetchMoviesHandler function, uses the fetch method,
   * which points at the Firebase API URL for the project.
   * previous error state is cleared with setError upon a good HTTP request
   * TRY BLOCK
   * triggered on the click event for the button returned in app.js
   * fetch defaults to a GET request and returns a promise.
   * if the response is not ok throw error,
   * else 'await' the promise to be delivered in the response object,
   * the json data returned from the api,
   * is then converted to a JavaScript object in this response,
   * 'await' this data conversion,
   * then map the data into the transformedMovies object,
   * translating the fields as named in the database to suit the application naming convention,
   * updates the 'movies' state to the transformedMovies data via the setMovies method.
   * CATCH BLOCK
   * if the response is not okay sets the error state to the string value
   */
  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("https://react-movie-app-ff8fc-default-rtdb.firebaseio.com/movies.json");

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

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
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  /**
   * useEffect hook that points at the fetchMoviesHandler function,
   * calling it on page load, same function passed as a dependency
   * when the function alters the effect is loaded again
   * the callback hook on fetchMoviesHandler prevents infinite loop
   */
  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  function addMovieHandler(movie) {
    console.log(movie);
  }

  let content = <p>Found no movies.</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
