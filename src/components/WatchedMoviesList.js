import React from "react";
import WatchedMovie from "./WatchedMovie";

function WatchedMoviesList({
  onDeleteWatchedMovie,
  watchedMovies,
  onSelectMovie,
}) {
  return (
    <ul className="list list-movies ">
      {watchedMovies?.map((watchedMovie) => (
        <WatchedMovie
          key={watchedMovie.imdbID}
          onDeleteWatchedMovie={onDeleteWatchedMovie}
          watchedMovie={watchedMovie}
          onSelectMovie={onSelectMovie}
          onClick={() => onSelectMovie(watchedMovie.imdbID)}
        />
      ))}
    </ul>
  );
}

export default WatchedMoviesList;
