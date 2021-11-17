import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import axios from 'axios';

import SavedList from './Movies/SavedList';
import MovieList from './Movies/MovieList';
import Movie from './Movies/Movie';

export default function App() {
  const [saved, setSaved] = useState([]); // Stretch: the ids of "saved" movies
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const getMovies = () => {
      axios
        .get("http://localhost:5000/api/movies") // Study this endpoint with Postman
        .then((response) => {
          // Study this response with a breakpoint or log statements
          // and set the response data as the 'movieList' slice of state
          setMovieList(response.data);
        })
        .catch((error) => {
          console.error("Server Error", error);
        });
    };
    getMovies();
  }, []);

  const addToSavedList = (id) => {
    // This is stretch. Prevent the same movie from being "saved" more than once
    if (movieList.id === id && !saved.includes(id)) {
      setSaved([...saved, movieList.id])
    }
  };

  return (
    <div>
      <SavedList list={saved} addToSaved={addToSavedList} />
      <Switch>
        <Route path={"/movies/:id"}>
          <Movie />
        </Route>
        <Route path={"/"}>
          <MovieList movies={movieList} />
        </Route>
      </Switch>
      <div>Replace this Div with your Routes</div>
    </div>
  );
}