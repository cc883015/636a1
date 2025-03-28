import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
  const { token, role, logout } = useContext(AuthContext);

  if (!token) {
    return <p>你尚未登录</p>;
  }

  return (
    <div>
      <h2>个人中心</h2>
      <p>角色: {role}</p>
      <button onClick={logout}>退出登录</button>
    </div>
  );
};

export default Profile;
