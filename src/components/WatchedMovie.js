import React from "react";

function WatchedMovie({ watchedMovie, onDeleteWatchedMovie, onClick }) {
  return (
    <li key={watchedMovie.imdbID}>
      <img src={watchedMovie.poster} alt={`${watchedMovie.title} poster`} />
      <h3 onClick={onClick}>{watchedMovie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{watchedMovie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{watchedMovie.userRating} </span>
        </p>
        <p>
          <span>⏳</span>
          <span>{watchedMovie.runtime} min</span>
        </p>
        <button
          className="btn-delete"
          onClick={() => onDeleteWatchedMovie(watchedMovie.imdbID)}
        >
          X
        </button>
      </div>
    </li>
  );
}

export default WatchedMovie;
