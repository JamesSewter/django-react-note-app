import { useState, useEffect } from 'react';
import api from '../api';
import Note from '../components/Note';
import Header from '../components/Header';
import Logout from '../components/Logout';
import '../styles/home.css';

function Home() {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = async () => {
    try {
      const res = await api.get('/api/notes/');
      setNotes(res.data);
      console.log(res.data);
    } catch (err) {
      alert(err);
    }
  };

  const deleteNote = async (id) => {
    try {
      const res = await api.delete(`/api/notes/delete/${id}/`);
      if (res.status === 204) {
        alert('Note deleted');
      } else {
        alert('Failed to delete note');
      }
      await getNotes();
    } catch (err) {
      console.log('here');
      alert(err);
    }
  };

  const createNote = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post('/api/notes/', { content, title });

      if (res.status === 201) {
        alert('Note created!');
      } else {
        alert('Failed to make note.');
      }
      await getNotes();
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div>
      <div>
        <Header />
        <Logout />
      </div>
      <form onSubmit={createNote}>
        <h2>Post a Note</h2>
        <label htmlFor='title'>Title:</label>
        <br />
        <input
          type='text'
          id='title'
          name='title'
          required
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <label htmlFor='content'>Content:</label>
        <br />
        <textarea
          id='content'
          name='content'
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <br />
        <input type='submit' value='Submit'></input>
      </form>
      <div>
        <h2 id="notes-subheader" >Your notes:</h2>
        {notes.map((note) => (
          <Note note={note} onDelete={deleteNote} key={note.id} />
        ))}
      </div>
    </div>
  );
}

export default Home;
