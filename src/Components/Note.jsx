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
                    pb-8  {/* 💡 Increased bottom padding (pb-8) to make room for the button */}
                    relative 
                    min-h-[100px] 
                    hover:shadow-xl 
                    transition duration-200">
      
      <h1 className="text-xl font-bold mb-1">{props.title}</h1>
      
      {/* Reduced bottom margin on content to look cleaner */}
      <p className="text-gray-700 text-base mb-2 whitespace-pre-wrap">{props.content}</p> 
      
      <button 
        onClick={handleClick}
        className="absolute 
                   right-2 
                   bottom-2 
                   bg-transparent 
                   border-2 border-yellow-500  {/* Added a subtle border for a cleaner look */}
                   text-yellow-500 
                   rounded-full  {/* Ensures it's a circular target */}
                   w-8 
                   h-8 
                   flex items-center justify-center  {/* Centers the text/icon inside the circle */}
                   cursor-pointer 
                   hover:bg-black-500 
                   hover:text-black-100 
                   focus:outline-none 
                   transition-colors"
      >
        {/* Use a simple character or icon for better alignment */}
        &#x2715; 
      </button>
    </div>
  );
}