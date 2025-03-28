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
      <Link to="/">BookList</Link>
      {token ? (
        <>
          <Link to="/profile">profile</Link>
          <button onClick={handleLogout}>log out</button>
        </>
      ) : (
        <>
          <Link to="/login">log in</Link>
          <Link to="/register">register</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
