import React from "react";

function NumResults({ movies }) {
  return <p className="num-results">Found {movies.length} results</p>;
}

export default NumResults;
