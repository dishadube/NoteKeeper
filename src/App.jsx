import React, { useState, useEffect } from 'react'
import Header from './Components/Header'
import CreateArea from './Components/CreateArea' 
import Footer from './Components/Footer'
import Note from './Components/Note'
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

  const filteredNotes = notes.filter(note => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return (
      note.title.toLowerCase().includes(lowerCaseSearchTerm) ||
      note.content.toLowerCase().includes(lowerCaseSearchTerm)
    );
  });

  return (  
    <div className="min-h-screen bg-gray-100 font-sans">
      <Header/>
      
      <Search 
        onSearch={handleSearch}
        searchTerm={searchTerm}
      />
      
      <CreateArea onAdd={addNote}/>  
      
      {/* Tailwind Responsive Grid Container */}
      <div className="grid gap-4 p-4 pb-16 
                      sm:grid-cols-2 
                      lg:grid-cols-3 
                      xl:grid-cols-4 
                      sm:px-8">
        {filteredNotes.map((note) => (
          <Note 
            key={note.id} 
            id={note.id} 
            title={note.title} 
            content={note.content} 
            onDelete={deleteNote} 
          />
        ))}
      </div>
      
      {filteredNotes.length === 0 && notes.length > 0 && searchTerm.trim() !== '' && (
          <p className="text-center mt-8 text-gray-500 italic w-full">No notes found matching "{searchTerm}"</p>
      )}

      <Footer/>
    </div>
  )
}