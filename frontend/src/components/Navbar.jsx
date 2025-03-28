// frontend/src/components/Navbar.jsx

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { token, role, logout } = useContext(AuthContext);

  return (
    <nav style={styles.nav}>
      <ul style={styles.ul}>
        <li style={styles.li}>
          <strong>
            <Link to="/" style={styles.link}>
              书籍管理
            </Link>
          </strong>
        </li>

        {!token && (
          <>
            <li style={styles.li}>
              <Link to="/login" style={styles.link}>
                登录
              </Link>
            </li>
            <li style={styles.li}>
              <Link to="/register" style={styles.link}>
                注册
              </Link>
            </li>
          </>
        )}

        {token && (
          <>
            <li style={styles.li}>
              <Link to="/profile" style={styles.link}>
                个人中心
              </Link>
            </li>
            {/* 只有管理员能看见管理员面板入口 */}
            {role === 'admin' && (
              <li style={styles.li}>
                <Link to="/" style={styles.link}>
                  管理员面板
                </Link>
              </li>
            )}
            <li style={styles.li}>
              <button onClick={logout} style={styles.button}>
                退出登录
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

const styles = {
  nav: {
    backgroundColor: '#f8f8f8',
    padding: '10px',
    borderBottom: '1px solid #ccc',
    marginBottom: '20px'
  },
  ul: {
    listStyle: 'none',
    display: 'flex',
    gap: '1rem',
    margin: 0,
    padding: 0
  },
  li: {
    margin: 0
  },
  link: {
    textDecoration: 'none',
    color: '#333'
  },
  button: {
    cursor: 'pointer',
    backgroundColor: 'transparent',
    border: 'none',
    color: '#007bff'
  }
};

export default Navbar;
