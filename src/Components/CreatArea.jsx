import React, { useState } from "react";

export default function CreateArea(props) {
  const [note, setNote] = useState({ title: "", content: "" });
  const [isExpanded, setExpanded] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setNote((prevNote) => ({
      ...prevNote,
      [name]: value,
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
  }

  return (
    <div className="create-area w-full flex justify-center px-4 sm:px-6 md:px-8 mt-3">
      {/* NOTE: form is `relative` so the floating button can be absolutely positioned. */}
      <form
        onSubmit={handleSubmit}
        className={`relative w-full max-w-3xl bg-white rounded-2xl shadow-md p-4 sm:p-6 transition-all duration-200 ease-in-out
                      ${isExpanded ? "md:pt-6" : "md:pt-4"}`}
        aria-label="Create note"
      >
        {/* Give the form bottom padding so the absolute button won't overlap content on small screens */}
        <div className="pb-6">
          {/* Title: shown when expanded on small screens, always visible on md+ */}
          <input
            name="title"
            placeholder="Title"
            value={note.title}
            onChange={handleChange}
            onFocus={expand}
            className={`w-full border-none outline-none text-lg font-semibold mb-2 resize-none placeholder-gray-400
                        ${isExpanded ? "block" : "hidden md:block"}`}
            aria-label="Note title"
          />

          {/* Content textarea: single-row placeholder that grows when expanded */}
          <textarea
            name="content"
            placeholder="Take a note..."
            value={note.content}
            onChange={handleChange}
            onClick={expand}
            onFocus={expand}
            rows={isExpanded ? 4 : 1}
            className={`w-full border-none outline-none resize-none text-base leading-relaxed placeholder-gray-500 bg-transparent
                        ${isExpanded ? "min-h-[6rem]" : "min-h-[2.2rem] md:min-h-[3rem]"}`}
            aria-label="Note content"
          />
        </div>

        {/* Floating Add button: different sizes/positions for small vs larger screens */}
        {isExpanded && (
          <button
            type="submit"
            className="absolute right-4 -bottom-5 sm:bottom-4 sm:right-4 bg-yellow-500 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-transform transform-gpu active:scale-95"
            aria-label="Add note"
            title="Add note"
          >
            {/* plus icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
              aria-hidden
            >
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}

        {/* Small-screen hint button: show a subtle add CTA when collapsed on very small screens */}
        {!isExpanded && (
          <div className="absolute right-4 -bottom-4 sm:hidden">
            <button
              type="button"
              onClick={expand}
              className="bg-gray-100 text-gray-700 rounded-full w-8 h-8 flex items-center justify-center shadow-sm hover:bg-gray-200 focus:outline-none"
              aria-label="Expand note"
              title="Create note"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
