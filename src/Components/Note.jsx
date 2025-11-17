// Note.jsx

import React from "react";

export default function Note(props) {
  function handleClick() {
    // Pass the unique ID back to the onDelete function
    props.onDelete(props.id); 
  }

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button onClick={handleClick}>Delete</button>
    </div>
  );
}