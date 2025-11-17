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
    <div className="flex justify-end items-center px-4 pt-2 sm:px-8 relative w-full z-10">
      {/* Search Icon Button */}
      <button 
        className="text-2xl p-1 cursor-pointer bg-transparent border-none focus:outline-none" 
        onClick={toggleSearch}>
        🔍 
      </button>
      
      {/* Conditional Rendering of Search Input */}
      {isSearchVisible && (
        <input
          className="search-input 
                     flex-grow max-w-xs 
                     py-2 px-3 ml-2 
                     border border-gray-300 
                     rounded-md 
                     text-base 
                     shadow-sm 
                     focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
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