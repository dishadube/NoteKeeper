import React from "react";

export default function Note(props) {
  function handleClick() {
    // Pass the unique ID back to the onDelete function
    props.onDelete(props.id); 
  }

  return (
    <div className="note 
                    bg-white 
                    rounded-lg 
                    shadow-md 
                    p-3 
                    relative 
                    min-h-[100px] 
                    hover:shadow-xl 
                    transition duration-200">
      <h1 className="text-xl font-bold mb-1">{props.title}</h1>
      <p className="text-gray-700 text-base mb-10 whitespace-pre-wrap">{props.content}</p>
      
      <button 
        onClick={handleClick}
        className="absolute 
                   right-2 
                   bottom-2 
                   bg-transparent 
                   border-none 
                   text-yellow-500 
                   w-9 
                   h-9 
                   cursor-pointer 
                   hover:text-yellow-700 
                   focus:outline-none"
      >
        Delete
      </button>
    </div>
  );
}