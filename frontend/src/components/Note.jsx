import React from 'react';
import "../styles/note.css"

function Note({ note, onDelete, isDarkMode }) {
  const formattedDate = new Date(note.created_at).toLocaleDateString('en-gb');

  return (
    <div className={`note-container ${isDarkMode ? 'dark-note' : 'light-note'}`}>
      <h2 className='note-title' >
        {note.title}
      </h2>

      <p className='note-content' >
        {note.content}
      </p>
      <p className='note-date' >Note made:
        {formattedDate}
      </p>

      <button className='delete-button' onClick={() => onDelete(note.id)}>
        Delete
      </button>
    </div>
  );
}

export default Note;
