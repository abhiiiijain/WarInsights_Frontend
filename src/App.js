import React, { useState } from 'react';
import Register from './components/Register';
import Login from './components/Login';
import WarlogCard from './components/WarlogCard';
import { fetchWarlog } from './api';

function App() {
  const [user, setUser] = useState(null);
  const [clanTag, setClanTag] = useState('');
  const [warlog, setWarlog] = useState([]);
  const [error, setError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false); // Manage register state

  const handleFetchWarlog = async () => {
    try {
      const data = await fetchWarlog(clanTag);
      setWarlog(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLoginSuccess = (user) => {
    setUser(user); // Set the authenticated user
  };

  const handleLoginFailure = () => {
    setIsRegistering(true); // Show register if login fails
  };

  const toggleRegister = () => {
    setIsRegistering((prev) => !prev); // Toggle between login and register form
  };

  return (
    <div className="App">
      {!user ? (
        <>
          {!isRegistering ? (
            <Login onLogin={handleLoginSuccess} onLoginFailure={handleLoginFailure} toggleRegister={toggleRegister} />
          ) : (
            <Register toggleRegister={toggleRegister} />
          )}
        </>
      ) : (
        <>
          <h1>Welcome, {user.name}</h1>
          <input
            type="text"
            placeholder="Enter Clan Tag (e.g., #2PP)"
            value={clanTag}
            onChange={(e) => setClanTag(e.target.value)}
          />
          <button onClick={handleFetchWarlog}>Fetch Warlog</button>

          {error && <p style={{ color: 'red' }}>{error}</p>}

          <div>
            {warlog.map((war, index) => (
              <WarlogCard key={index} war={war} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
