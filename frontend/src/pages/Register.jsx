import React, { useState } from 'react';
import axios from '../axiosConfig';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail]   = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/auth/register', {
        username, email, password
      });
      alert('注册成功，请登录！');
    } catch (err) {
      alert('注册失败');
    }
  };

  return (
    <div style={styles.container}>
      <h2>register</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label>Username:</label>
          <input 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label>Email:</label>
          <input 
            type="email"
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label>Password:</label>
          <input 
            type="password"
            value={password} 
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
    gap: '10px',
    width: '300px'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column'
  },
  button: {
    backgroundColor: '#28a745', // 按钮自定义颜色 (绿色示例)
    color: '#fff',
    border: 'none',
    padding: '10px 15px',
    cursor: 'pointer',
    borderRadius: '4px'
  }
};

export default Register;
