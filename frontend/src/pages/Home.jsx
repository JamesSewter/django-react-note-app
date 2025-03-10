import { useState, useEffect } from 'react';
import api from '../api';
import { AxiosError } from 'axios';

function Home() {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = async () => {
    try {
      const res = await api.get('api/notes/');
      setNotes(res.data);
      console.log(notes);
    } catch (err) {
      alert(err);
    }
  };

  const deleteNote = async (id) => {
    try {
      const res = await api.delete(`/api/notes/delete/${id}`);
      if (res.status === 204) {
        alert('Note deleted');
      } else {
        alert('Failed to delete note');
      }
      await getNotes();
    } catch (err) {
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
        <h2>Notes</h2>
      </div>
      <form onSubmit={createNote}>
        <label htmlFor='title'>Title:</label>
        <br />
        <input
          type='text'
          id='title'
          required
          onChange={(e) => setTitle(e.target.valueAsDate)}
          value={title}
        />
        <label htmlFor='content'>Content:</label>
        <br />
        <textarea
          name='content'
          id='content'
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <br />
        <input type='submit' value='Submit'></input>
      </form>
    </div>
  );
}

export default Home;
