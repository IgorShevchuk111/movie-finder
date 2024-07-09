import { useEffect, useState } from "react";

const KEY = "e80f34fa";

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

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

    fetchMovies();

    return () => {
      controller.abort();
    };
  }, [query]);

  return { isLoading, error, movies };
}
