// frontend/src/pages/Login.jsx
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      login(res.data.token, res.data.role);
      navigate('/');
    } catch (err) {
      alert('登录失败');
    }
  };

  return (
    <div style={styles.container}>
      <h2>登录</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label>Email</label>
          <input
            type="email"
            style={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label>Password</label>
          <input
            type="password"
            style={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" style={styles.button}>登录</button>
      </form>
    </div>
  );
};

const styles = {
  container: { maxWidth: '400px', margin: '0 auto', padding: '20px' },
  form: { display: 'flex', flexDirection: 'column' },
  formGroup: { marginBottom: '15px' },
  input: { width: '100%', padding: '8px', marginTop: '5px' },
  button: {
    padding: '10px',
    backgroundColor: '#007bff',
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
    borderRadius: '4px'
  }
};

export default Login;
