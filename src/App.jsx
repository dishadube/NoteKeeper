// src/App.jsx

import React, { useState, useEffect } from 'react'
import Header from './Components/Header'
import CreatArea from './Components/CreatArea' // Corrected capitalization CreatArea -> CreateArea
import Footer from './Components/Footer'
import Note from './Components/Note'
// 💡 New Import for the Search component
import Search from './Components/Search/Search' 


export default function App() {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('notes');
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  const [searchTerm, setSearchTerm] = useState(''); 

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  // ... (addNote and deleteNote functions remain the same) ...
  function addNote(newNote) {
    const noteWithId = {
        ...newNote,
        id: Date.now() 
    };
    setNotes((prevNotes) => [...prevNotes, noteWithId]);
  }

  function deleteNote(idToDelete) {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== idToDelete));
  }

  function handleSearch(event) {
    setSearchTerm(event.target.value);
  }
  // ... (end of addNote and deleteNote) ...


  const filteredNotes = notes.filter(note => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return (
      note.title.toLowerCase().includes(lowerCaseSearchTerm) ||
      note.content.toLowerCase().includes(lowerCaseSearchTerm)
    );
  });

  return (  
    <div>
      <Header/>
      
      {/* 💡 Rendering the new Search component here */}
      <Search 
        onSearch={handleSearch}
        searchTerm={searchTerm}
      />
      
      {/* The CreateArea component, now only handling note creation */}
      <CreatArea onAdd={addNote}/>  
      
      {/* ... (Note mapping remains the same) ... */}
      {filteredNotes.map((note) => (
        <Note 
          key={note.id} 
          id={note.id} 
          title={note.title} 
          content={note.content} 
          onDelete={deleteNote} 
        />
      ))}
      
      {filteredNotes.length === 0 && notes.length > 0 && searchTerm.trim() !== '' && (
          <p className="no-results-message">No notes found matching "{searchTerm}"</p>
      )}

      <Footer/>
    </div>
  )
}