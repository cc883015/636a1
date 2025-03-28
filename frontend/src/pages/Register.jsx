// frontend/src/pages/Register.jsx

import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail]   = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/auth/register', {
        username,
        email,
        password
      });
      alert('注册成功，请登录！');
    } catch (err) {
      alert('注册失败');
    }
  };

  return (
    <div style={styles.container}>
      <h2>注册</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label>Username</label>
          <input
            value={username}
            style={styles.input}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            style={styles.input}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label>Password</label>
          <input
            type="password"
            value={password}
            style={styles.input}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" style={styles.button}>注册</button>
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
    backgroundColor: '#28a745',
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
    borderRadius: '4px'
  }
};

export default Register;
