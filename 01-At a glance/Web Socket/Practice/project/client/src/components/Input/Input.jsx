import React from "react";

function Input({ name, placeholder, handleEvent }) {
  return (
    <>
      <input
        className="px-1 py-1 mr-4"
        name={name}
        placeholder={placeholder}
        onChange={handleEvent}
      />
    </>
  );
}

export default Input;
