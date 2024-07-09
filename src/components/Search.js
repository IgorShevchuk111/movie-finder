import React, { useEffect, useRef } from "react";

function Search({ query, handleQuery }) {
  const inputEl = useRef(null);

  useEffect(() => {
    inputEl.current.focus();
  }, []);
  return (
    <input
      value={query}
      onChange={(e) => handleQuery(e.target.value)}
      className="search"
      placeholder="Search movies..."
      ref={inputEl}
    />
  );
}

export default Search;
