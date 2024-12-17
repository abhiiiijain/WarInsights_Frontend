import React, { useState } from 'react';
import { registerUser } from '../api';

const Register = ({ toggleRegister }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    league: 'GFL',
    department: 'Blacklist',
  });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      const response = await registerUser(formData);
      setMessage(response.msg);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && <p style={{ color: 'green' }}>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <select name="league" onChange={handleChange}>
          <option value="GFL">GFL</option>
          <option value="FWL">FWL</option>
        </select>
        <select name="department" onChange={handleChange}>
          <option value="Blacklist">Blacklist</option>
          <option value="Mismatch">Mismatch</option>
          <option value="Entry">Entry</option>
          <option value="Sync">Sync</option>
          <option value="Audit">Audit</option>
          <option value="Dispute">Dispute</option>
        </select>
        <button type="submit">Register</button>
      </form>
      <button onClick={toggleRegister}>Already have an account? Login here</button> {/* Toggle login form */}
    </div>
  );
};

export default Register;
