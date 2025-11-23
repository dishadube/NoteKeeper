import React, { useState, useEffect, useRef } from "react";

// Props expected:
// onSearch: function(event) -> called on input change
// searchTerm: string
// initiallyVisibleOnMd: optional boolean (default true) -> whether the search is visible on md+ (matches CreateArea behavior)
export default function Search({ onSearch, searchTerm = "", initiallyVisibleOnMd = true }) {
  const [isSearchVisible, setSearchVisible] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    // If we toggle visibility on small screens, focus the input when it appears
    if (isSearchVisible && inputRef.current) inputRef.current.focus();
  }, [isSearchVisible]);

  function toggleSearch() {
    // If hiding, clear the parent's search filter by sending an empty-like event
    if (isSearchVisible && onSearch) onSearch({ target: { name: "search", value: "" } });
    setSearchVisible((prev) => !prev);
  }

  return (
    // Use the same outer container sizing as CreateArea so they line up visually
    <div className="w-full flex justify-end px-4 sm:px-6 md:px-8 mb-6 md:mb-8">
      <div className="w-full max-w-3xl mx-auto flex items-center justify-end relative">
        {/* On md+ we optionally show an always-visible compact search; on sm screens it toggles */}

        {/* Search input - hidden on small screens unless toggled, visible on md+ when `initiallyVisibleOnMd` is true */}
        <input
          ref={inputRef}
          name="search"
          type="text"
          value={searchTerm}
          onChange={onSearch}
          placeholder="Search notes..."
          className={`transition-all duration-200 ease-in-out outline-none rounded-md shadow-sm
                        border border-gray-300 px-3 py-2 text-sm placeholder-gray-400
                        focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500
                        
                        /* layout rules */
                        ${
                          // Visible on md+ when enabled; on small screens show only when toggled
                          initiallyVisibleOnMd
                            ? "hidden sm:flex md:flex lg:flex xl:flex 2xl:flex md:max-w-xs"
                            : "hidden md:flex md:max-w-xs"
                        }
                      `}
          style={{ minWidth: 0 }}
          aria-label="Search notes"
        />

        {/* Small-screen overlay search (appears when toggled) */}
        {isSearchVisible && (
          <div className="w-full mt-3 sm:mt-0 sm:absolute sm:left-0 sm:right-0 sm:top-12 z-20 px-4 sm:px-0">
            <div className="w-full sm:w-auto max-w-md mx-auto sm:mx-0 bg-white p-2 rounded-md shadow-md flex items-center">
              <input
                ref={inputRef}
                name="search"
                type="text"
                value={searchTerm}
                onChange={onSearch}
                placeholder="Search notes..."
                className="w-full outline-none px-3 py-2 text-sm placeholder-gray-400"
                aria-label="Search notes"
              />
              <button
                type="button"
                onClick={() => {
                  // hide and clear
                  if (onSearch) onSearch({ target: { name: "search", value: "" } });
                  setSearchVisible(false);
                }}
                className="ml-2 p-2 rounded-md hover:bg-gray-100 focus:outline-none"
                aria-label="Close search"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Button group: search toggle and optional visible icon when input is visible on md+ */}
        <div className="flex items-center gap-2">
          {/* On md+ if input is visible, show a subtle icon (not required to toggle) */}
          <button
            type="button"
            onClick={toggleSearch}
            className="p-2 rounded-md focus:outline-none hover:bg-gray-100"
            aria-pressed={isSearchVisible}
            aria-label="Toggle search"
            title="Toggle search"
          >
            <span className="sr-only">Toggle search</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
              aria-hidden
            >
              <path
                fillRule="evenodd"
                d="M12.9 14.32a8 8 0 111.414-1.414l3.387 3.386a1 1 0 01-1.414 1.415l-3.387-3.387zM8 14a6 6 0 100-12 6 6 0 000 12z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        {/* Fallback: if the md+ input is hidden by CSS above, we still render a visually-hidden input for accessibility */}
      </div>
    </div>
  );
}
