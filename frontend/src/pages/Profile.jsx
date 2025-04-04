import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
  const { token, role, logout } = useContext(AuthContext);

  if (!token) {
    return <p>you should login</p>;
  }

  return (
    <div>
      <h2>profile</h2>
      <p>role: {role}</p>
      <button onClick={logout}>logout</button>
    </div>
  );
};

export default Profile;
