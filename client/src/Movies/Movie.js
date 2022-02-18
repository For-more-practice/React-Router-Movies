import React, { useState, useEffect } from 'react';
import { useParams, useRouteMatch } from "react-router-dom";
import axios from 'axios';
import SavedList from './SavedList';

export default function Movie(props) {
  const [movie, setMovie] = useState();
  const [list, setList] = useState([])

  const param = useParams();
  const { addToSavedList } = props;

  useEffect(() => {
    const id = param.id;
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(response => {
        console.log(response)
        setMovie(response.data)
      })
      .catch(error => {
        console.error(error);
      });
  }, [param.id]);
  console.log(movie)

  // Uncomment this only when you have moved on to the stretch goals
  const saveMovie = evt => {

    setList(addToSavedList(title));
  }

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  const { title, director, metascore, stars } = movie;

  return (
    <div className="save-wrapper">
      <div className="movie-card">
        <h2>{title}</h2>
        <div className="movie-director">
          Director: <em>{director}</em>
        </div>
        <div className="movie-metascore">
          Metascore: <strong>{metascore}</strong>
        </div>
        <h3>Actors</h3>

        {stars.map(star => (
          <div key={star} className="movie-star">
            {star}
          </div>
        ))}
      </div>
      <div className="save-button" onClick={saveMovie}>Save</div>
    </div>
  );
}