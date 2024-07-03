import React from "react";

function Button({ onClick, isOpen }) {
  return (
    <button className="btn-toggle" onClick={onClick}>
      {isOpen ? "-" : "+"}
    </button>
  );
}

export default Button;
