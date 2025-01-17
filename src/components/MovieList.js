import Movie from "./Movie.js";

function MovieList({ movies, onSelectMovie }) {
  return (
    <ul className="list list-movies ">
      {movies?.map((movie) => (
        <Movie key={movie.imdbID} movie={movie} onSelectMovie={onSelectMovie} />
      ))}
    </ul>
  );
}

export default MovieList;
