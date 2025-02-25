import React from "react";
import { useHistory } from "react-router-dom";

export default function MovieDetails(props) {
    const { title, director, metascore, id } = props.movie;

    const history = useHistory()

    const routeToMovie = () => {
        history.push(`/movies/${id}`)
    }

    return (
        <div onClick={() => routeToMovie()} className="movie-card">
            <h2>{title}</h2>
            <div className="movie-director">
                Director: <em>{director}</em>
            </div>
            <div className="movie-metascore">
                Metascore: <strong>{metascore}</strong>
            </div>
        </div>
    );
}