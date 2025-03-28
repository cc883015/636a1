// frontend/src/pages/Profile.jsx

import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
  const { token, role, logout } = useContext(AuthContext);

  if (!token) {
    return (
      <div style={{ padding: '20px' }}>
        <p>你尚未登录</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <h2>个人中心</h2>
      <p>角色: {role}</p>
      <button onClick={logout} style={styles.button}>退出登录</button>
    </div>
  );
};

const styles = {
  button: {
    padding: '10px',
    backgroundColor: '#dc3545',
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
    borderRadius: '4px'
  }
};

export default Profile;
