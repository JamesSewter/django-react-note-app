import React from 'react';
import "../styles/note.css"

function Note({ note, onDelete }) {
  const formattedDate = new Date(note.created_at).toLocaleDateString('en-gb');

  return (
    <div className='note-container'>
      <p className='note-title' >
        {note.title}
      </p>

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
