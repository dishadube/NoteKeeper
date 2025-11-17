// src/Components/CreateArea.jsx

import React, { useState } from "react";
// Removed Search import

export default function CreateArea(props) {
  const [note, setNote] = useState({ title: "", content: "" });
  const [isExpanded, setExpanded] = useState(false); 
  // Removed isSearchVisible state

  function handleChange(event) {
    const { name, value } = event.target;
    setNote((prevNote) => ({
      ...prevNote,
      [name]: value
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (note.title.trim() !== "" || note.content.trim() !== "") {
      props.onAdd(note);
      setNote({ title: "", content: "" });
    }
    setExpanded(false); 
  }

  function expand() {
    setExpanded(true);
    // Removed call to setSearchVisible(false);
  }

  return (
    <div className="create-area">
      {/* Removed the search-container and all search logic from here. 
        It will be rendered separately in App.jsx.
      */}
      
      {/* Note Creation Form */}
      <form className="create-note" onSubmit={handleSubmit}>
        {isExpanded && (
          <input
            className="title"
            name="title"
            placeholder="Title"
            onChange={handleChange}
            value={note.title}
          />
        )}
        <textarea
          className="textarea"
          name="content"
          rows={isExpanded ? 3 : 1}
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          onClick={expand}
          onFocus={expand}
        />
        {isExpanded && <button type="submit">Add</button>}
      </form>
    </div>
  );
}