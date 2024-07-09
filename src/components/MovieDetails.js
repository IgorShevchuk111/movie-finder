import { useEffect, useState, useRef } from "react";
import StarRating from "./StarRating";
import Loader from "./Loader";

const KEY = "e80f34fa";

function MovieDetails({
  selectedMovieId,
  onCloseMovie,
  watchedMovies,
  onAddWatchedMovie,
}) {
  const [movie, setMovie] = useState({});
  const [userRating, setUserRating] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const isInWatchedList = watchedMovies.find(
    (movie) => movie.imdbID === selectedMovieId
  );

  const countRef = useRef(0);

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedMovieId,
      imdbRating: Number(imdbRating),
      poster,
      title,
      userRating,
      runtime: Number(runtime.split(" ").at(0)),
      year,
      countRatingDecisions: countRef.current,
    };

    onAddWatchedMovie(newWatchedMovie);
    onCloseMovie();
  }

  useEffect(() => {
    async function getMovieDetails() {
      try {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?&apikey=${KEY}&i=${selectedMovieId}`
        );
        const data = await res.json();
        setMovie(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    getMovieDetails();
  }, [selectedMovieId]);

  useEffect(() => {
    if (!title) return;
    document.title = `Movie | ${title}`;

    return () => (document.title = "Movie Finder");
  }, [title]);

  useEffect(() => {
    if (userRating) countRef.current++;
  }, [userRating]);

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button onClick={onCloseMovie} className="btn-back">
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${movie} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              {!isInWatchedList ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />

                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to List
                    </button>
                  )}
                </>
              ) : (
                <p>You have rated the movie {isInWatchedList.userRating} ⭐️</p>
              )}
            </div>

            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}

export default MovieDetails;
