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
    <nav style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
      <Link to="/">书籍列表</Link>
      {token ? (
        <>
          <Link to="/profile">个人中心</Link>
          <button onClick={handleLogout}>退出登录</button>
        </>
      ) : (
        <>
          <Link to="/login">登录</Link>
          <Link to="/register">注册</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
