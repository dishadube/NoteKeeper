import React, { useState, useEffect, useRef } from "react";

export default function Search({
  onSearch,
  searchTerm = "",
  initiallyVisibleOnMd = true,
}) {
  const [isSearchVisible, setSearchVisible] = useState(false);
  const deskRef = useRef(null);
  const mobileRef = useRef(null);

  const mdQuery = "(min-width: 768px)";

  useEffect(() => {
    if (isSearchVisible && mobileRef.current) mobileRef.current.focus();
  }, [isSearchVisible]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia(mdQuery);
    function handleChange(e) {
      if (e.matches) setSearchVisible(false);
    }
    if (mq.matches) setSearchVisible(false);
    mq.addEventListener ? mq.addEventListener("change", handleChange) : mq.addListener(handleChange);
    return () =>
      mq.removeEventListener ? mq.removeEventListener("change", handleChange) : mq.removeListener(handleChange);
  }, []);

  function clearSearch() {
    if (!onSearch) return;
    try { onSearch({ target: { name: "search", value: "" } }); } catch (e) {}
    try { onSearch(""); } catch (e) {}
  }

  function isDesktopNow() {
    if (typeof window === "undefined") return false;
    return window.matchMedia(mdQuery).matches;
  }

  function toggleSearch() {
    if (isDesktopNow()) {
      if (deskRef.current) deskRef.current.focus();
      setSearchVisible(false);
      return;
    }
    setSearchVisible((s) => !s);
  }

  return (
    <div className="w-full flex justify-end px-4 sm:px-6 md:px-8 mb-6 md:mb-8">
      <div className="w-full max-w-3xl mx-auto flex items-center justify-end relative">
        {/* Desktop input (unchanged) */}
        <input
          ref={deskRef}
          name="search"
          type="text"
          value={searchTerm}
          onChange={(e) => onSearch && onSearch(e)}
          placeholder="Search notes..."
          className={`transition-all duration-200 ease-in-out outline-none rounded-md shadow-sm
                      border border-gray-300 px-3 py-2 text-sm placeholder-gray-400
                      focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500
                      ${initiallyVisibleOnMd ? "hidden md:flex md:max-w-xs" : "hidden md:flex md:max-w-xs"}`}
          style={{ minWidth: 0 }}
          aria-label="Search notes"
        />

        {/* MOBILE: render inline (not absolute) so it pushes the Create area down.
            md:hidden ensures this block never shows on desktop. */}
        {isSearchVisible && (
          <div className="w-full mt-3 px-4 md:hidden">
            <div className="w-full max-w-md mx-auto bg-white p-2 rounded-md shadow-md flex items-center">
              <input
                ref={mobileRef}
                name="search"
                type="text"
                value={searchTerm}
                onChange={(e) => onSearch && onSearch(e)}
                placeholder="Search notes..."
                className="w-full outline-none px-3 py-2 text-sm placeholder-gray-400"
                aria-label="Search notes"
              />
              <button
                type="button"
                onClick={() => {
                  clearSearch();
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

        {/* Toggle */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleSearch}
            className="p-2 rounded-md focus:outline-none hover:bg-gray-100"
            aria-pressed={isSearchVisible}
            aria-label="Toggle search"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5" aria-hidden>
              <path fillRule="evenodd" d="M12.9 14.32a8 8 0 111.414-1.414l3.387 3.386a1 1 0 01-1.414 1.415l-3.387-3.387zM8 14a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
