import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from '../axiosConfig';
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
      alert('Login failed');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Log In</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label>Email: </label>
          <input 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div style={styles.formGroup}>
          <label>Password: </label>
          <input 
            type="password"
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit" style={styles.button}>Log In</button> 
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',  // 水平居中
    justifyContent: 'center',
    marginTop: '100px'     // 让表单往下稍微居中（可根据需求调整）
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',           // 每个表单控件之间留点间隔
    width: '300px'         // 给表单固定宽度，便于居中
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column'
  },
  button: {
    backgroundColor: '#007bff', // 登录按钮背景色
    color: '#fff',
    border: 'none',
    padding: '10px 15px',
    cursor: 'pointer',
    borderRadius: '4px'
  }
};

export default Login;
