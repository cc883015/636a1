
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={styles.nav}>
      {/*  Logo */}
      <div style={styles.left}>
        <Link to="/" style={styles.link}>ProductList</Link>
      </div>

      {/* button*/}
      <div style={styles.right}>
        {token ? (
          <>
            <Link to="/profile" style={styles.link}>Profile</Link>
            <button onClick={handleLogout} style={styles.button}>Log out</button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>Log in</Link>
            <Link to="/register" style={styles.link}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between', // 左右分布
    alignItems: 'center',
    backgroundColor: '#f8f8f8',      // 导航栏背景色，可自行修改
    padding: '10px',
    marginBottom: '20px'
  },
  left: {
    // 如果你想给左侧更多自定义样式可在这里添加
  },
  right: {
    display: 'flex',
    gap: '10px' // 控制右侧 Link/button 之间的间距
  },
  link: {
    textDecoration: 'none',
    color: '#333'
  },
  button: {
    cursor: 'pointer',
    border: 'none',
    backgroundColor: 'transparent',
    color: '#007bff'
  }
};

export default Navbar;
