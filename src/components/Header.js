import React from "react";

function Header() {
  return (
    <nav className="nav-bar">
      <div className="logo">
        <span>🍿</span>
        <h1>Finder movie</h1>
      </div>
      <input className="search" placeholder="Search movies..." />
      <p className="num-results">Found X results</p>
    </nav>
  );
}

export default Header;
