import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Search from "./Search";
import Logo from "./Logo";
import Main from "./Main";
import Box from "./Box";
import MovieList from "./MovieList";
import NumResults from "./NumResults";
import WatchedMoviesList from "./WatchedMoviesList";
import WatchedSummary from "./WatchedSummary";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import MovieDetails from "./MovieDetails";

const KEY = "e80f34fa";

function App() {
  const [movies, setMovies] = useState([]);
  const [watchedMovies, setWatchedMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  function handleAddWatchedMovie(movie) {
    setWatchedMovies((watchedMovies) => [...watchedMovies, movie]);
  }

  function handleDeleteWatchedMovie(id) {
    setWatchedMovies((watchedMovies) =>
      watchedMovies.filter((movie) => movie.imdbID !== id)
    );
  }

  function handleCloseMovie() {
    setSelectedMovieId(null);
  }

  function handleSelectMovie(id) {
    setSelectedMovieId((selectedMovieId) =>
      selectedMovieId === id ? null : id
    );
  }

  function handleQuery(searchedMovie) {
    setQuery(searchedMovie);
  }

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function fetchMovies() {
      try {
        if (!query.trim() || query.length < 3) {
          setMovies([]);
          setError("");
          return;
        }

        setIsLoading(true);
        setError("");

        const res = await fetch(
          `http://www.omdbapi.com/?&apikey=${KEY}&i=${KEY}&s=${query}`,
          { signal }
        );

        if (!res.ok)
          throw new Error("Something went wrong with fetching movies");

        const data = await res.json();

        if (data.Response === "False")
          throw new Error(data.Error || "No movies found");

        setMovies(data.Search || []);
        setError("");
      } catch (err) {
        if (err.name !== "AbortError") {
          console.log(err.message);
          setError(err.message || "Something went wrong");
        }
      } finally {
        setIsLoading(false);
      }
    }

    handleCloseMovie();
    fetchMovies();

    return () => {
      controller.abort();
    };
  }, [query]);

  useEffect(() => {
    function callback(e) {
      if (e.code === "Escape") {
        handleCloseMovie();
      }
    }
    document.addEventListener("keydown", callback);

    return () => {
      document.removeEventListener("keydown", callback);
    };
  }, []);

  return (
    <>
      <NavBar>
        <Logo />
        <Search query={query} handleQuery={handleQuery} />
        <NumResults movies={movies} />
      </NavBar>

      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          <WatchedSummary watchedMovies={watchedMovies} />
          {selectedMovieId ? (
            <MovieDetails
              selectedMovieId={selectedMovieId}
              onCloseMovie={handleCloseMovie}
              watchedMovies={watchedMovies}
              onAddWatchedMovie={handleAddWatchedMovie}
            />
          ) : (
            <WatchedMoviesList
              onDeleteWatchedMovie={handleDeleteWatchedMovie}
              onSelectMovie={handleSelectMovie}
              watchedMovies={watchedMovies}
            />
          )}
        </Box>
      </Main>
    </>
  );
}

export default App;
