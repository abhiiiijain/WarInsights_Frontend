import React, { useState } from 'react';
import { updateRole } from '../api';

const RoleUpdate = ({ user }) => {
  const [newRole, setNewRole] = useState('staff');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setNewRole(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      if (user.role !== 'admin') {
        setError('You are not authorized to update roles');
        return;
      }
      const response = await updateRole(user.id, newRole);
      setMessage(response.msg);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Update User Role</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && <p style={{ color: 'green' }}>{message}</p>}
      <form onSubmit={handleSubmit}>
        <select name="role" value={newRole} onChange={handleChange}>
          <option value="staff">Staff</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">Update Role</button>
      </form>
    </div>
  );
};

export default RoleUpdate;
