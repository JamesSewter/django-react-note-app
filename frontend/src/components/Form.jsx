import { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';
import '../styles/form.css';
import LoadingIndicator from './LoadingIndicator';

function Form({ route, method }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [loginFailed, setloginFailed] = useState(null);
  const [registerFailed, setregisterFailed] = useState(null);
  const navigate = useNavigate();

  const name = method === 'login' ? 'Login' : 'Register';

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const res = await api.post(route, { username, password });
      if (method === 'login') {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        setloginFailed(false);
        navigate('/');
      } else {
        navigate('/login');
      }
    } catch (error) {
      setregisterFailed(true)
      setloginFailed(true);
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className='form-container'>
        <h1>{name}</h1>
        <input
          className='form-input'
          type='text'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder='Username'
        />
        <input
          className='form-input'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'
        />
        {loading && <LoadingIndicator />}
        <button className='form-button' type='submit'>
          {name}
        </button>
      </form>
      <br />
      {method === 'login' && loginFailed ? (
        <div className='login-failure-container'>
          <h2>Login Failed:</h2>
          <p>Please check your username and password</p>
        </div>
      ) : null}
       {method === 'register' && registerFailed ? (
        <div className='register-failure-container'>
          <h2>Registration Failed:</h2>
          <p>Oops - looks like someone has chosen the same username as you. Please choose another username.</p>
        </div>
      ) : null}
    </div>
  );
}

export default Form;
