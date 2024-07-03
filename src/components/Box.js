import { useState } from "react";
import Button from "./Button";

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  function handleIsOpen() {
    setIsOpen((isOpen) => !isOpen);
  }

  return (
    <div className="box">
      <Button onClick={handleIsOpen} isOpen={isOpen} />
      {isOpen && children}
    </div>
  );
}

export default Box;
