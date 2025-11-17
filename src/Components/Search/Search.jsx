// src/Components/Search/Search.jsx

import React, { useState } from "react";

// This component expects props: onSearch, searchTerm, and onToggle
export default function Search(props) {
  // State for controlling the visibility of the search input
  const [isSearchVisible, setSearchVisible] = useState(false); 

  function toggleSearch() {
    // Clear search term when hiding the search bar (resets the filter)
    if (isSearchVisible) {
        props.onSearch({ target: { value: '' } }); 
    }
    setSearchVisible(prev => !prev);
    
    // Optional: Notify parent (App.jsx) if needed, but not necessary here.
    // props.onToggle(!isSearchVisible); 
  }

  return (
    <div className="search-container">
      {/* Search Icon Button */}
      <button className="search-toggle-btn" onClick={toggleSearch}>
        🔍 
      </button>
      
      {/* Conditional Rendering of Search Input */}
      {isSearchVisible && (
        <input
          className="search-input"
          name="search"
          placeholder="Search notes..."
          onChange={props.onSearch} 
          value={props.searchTerm} 
          type="text"
          autoFocus 
        />
      )}
    </div>
  );
}