import React, { useState } from 'react';
import { registerUser } from '../api';

const Register = ({ toggleRegister }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    league: '', // Set default to empty
    department: '', // Set default to empty
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
      setMessage(response.msg);  // Display registration success message
    } catch (err) {
      setError(err.message);  // Display registration error
    }
  };

  return (
    <div className="register-page">
      <h2>Register</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && <p style={{ color: 'green' }}>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="name" 
          placeholder="Name" 
          value={formData.name} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="email" 
          name="email" 
          placeholder="Email" 
          value={formData.email} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="password" 
          name="password" 
          placeholder="Password" 
          value={formData.password} 
          onChange={handleChange} 
          required 
        />
        <select 
          name="league" 
          onChange={handleChange} 
          value={formData.league}
        >
          <option value="">Select League</option>
          <option value="GFL">GFL</option>
          <option value="FWL">FWL</option>
        </select>
        <select 
          name="department" 
          onChange={handleChange} 
          value={formData.department}
        >
          <option value="">Select Department</option>
          <option value="Blacklist">Blacklist</option>
          <option value="Mismatch">Mismatch</option>
          <option value="Entry">Entry</option>
          <option value="Sync">Sync</option>
          <option value="Audit">Audit</option>
          <option value="Dispute">Dispute</option>
        </select>
        <button type="submit">Register</button>
      </form>

      <button onClick={toggleRegister}>Already have an account? Login here</button>
    </div>
  );
};

export default Register;
