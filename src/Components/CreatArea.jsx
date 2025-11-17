import React, { useState } from "react";

export default function CreateArea(props) {
  const [note, setNote] = useState({ title: "", content: "" });
  const [isExpanded, setExpanded] = useState(false); 

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
  }

  return (
    <div className="create-area">
      {/* Note Creation Form - Centered and Styled */}
      <form 
        className="create-note 
                   relative 
                   w-[90%] 
                   max-w-[600px] 
                   mx-auto 
                   my-8 
                   bg-white 
                   p-4 
                   rounded-lg 
                   shadow-md 
                   md:shadow-lg" 
        onSubmit={handleSubmit}
      >
        {isExpanded && (
          <input
            className="title 
                       w-full 
                       border-none 
                       p-1 
                       text-xl 
                       font-semibold 
                       resize-none 
                       outline-none 
                       mb-2"
            name="title"
            placeholder="Title"
            onChange={handleChange}
            value={note.title}
          />
        )}
        <textarea
          className="textarea 
                     w-full 
                     border-none 
                     p-1 
                     text-base 
                     resize-none 
                     outline-none"
          name="content"
          rows={isExpanded ? 3 : 1}
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          onClick={expand}
          onFocus={expand}
        />
        {/* Add Button - Absolute positioned at the bottom right */}
        {isExpanded && (
          <button 
            type="submit"
            className="absolute 
                       right-4 
                       bottom-[-18px] 
                       bg-yellow-500 
                       text-white 
                       border-none 
                       rounded-full 
                       w-9 
                       h-9 
                       shadow-md 
                       hover:bg-yellow-600 
                       focus:outline-none 
                       focus:ring-2 focus:ring-yellow-500 
                       z-10"
          >
            Add
          </button>
        )}
      </form>
    </div>
  );
}