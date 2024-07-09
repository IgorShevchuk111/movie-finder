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
import { useMovies } from "../hooks/useMovies";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
import { useKey } from "../hooks/useKey";

function App() {
  const [query, setQuery] = useState("");
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const { isLoading, movies, error } = useMovies(query);
  const [watchedMovies, setWatchedMovies] = useLocalStorageState(
    [],
    "watchedMovies"
  );

  useKey("Escape", handleCloseMovie);

  function handleCloseMovie() {
    setSelectedMovieId(null);
  }

  function handleAddWatchedMovie(movie) {
    setWatchedMovies((watchedMovies) => [...watchedMovies, movie]);
  }

  function handleDeleteWatchedMovie(id) {
    setWatchedMovies((watchedMovies) =>
      watchedMovies.filter((movie) => movie.imdbID !== id)
    );
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
    handleCloseMovie();
  }, [query]);

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
