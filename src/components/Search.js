import React from "react";

function Search({ query, handleQuery }) {
  return (
    <input
      value={query}
      onChange={(e) => handleQuery(e.target.value)}
      className="search"
      placeholder="Search movies..."
    />
  );
}

export default Search;
