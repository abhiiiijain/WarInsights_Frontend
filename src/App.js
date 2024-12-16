import React, { useState } from 'react';
import './App.css';

function App() {
  const [clanTag, setClanTag] = useState('');
  const [warlog, setWarlog] = useState([]);
  const [error, setError] = useState('');

  const fetchWarlog = async () => {
    setError('');
    setWarlog([]);

    if (!clanTag) {
      setError('Clan tag is required');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/warlog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ clanTag }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      const data = await response.json();
      setWarlog(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="App">
      <h1>Clash of Clans Warlog</h1>
      <div>
        <input
          type="text"
          placeholder="Enter Clan Tag (e.g., #2PP)"
          value={clanTag}
          onChange={(e) => setClanTag(e.target.value)}
        />
        <button onClick={fetchWarlog}>Fetch Warlog</button>
      </div>

      {error && <p className="error">{error}</p>}

      {warlog.length > 0 && (
        <div className="warlog">
          <h2>Warlog:</h2>
          {warlog.map((war, index) => (
            <div key={index} className="war">
              <h3>War #{index + 1}</h3>
              <p>Result: {war.result || 'Unknown'}</p>
              <p>End Time: {new Date(war.endTime).toLocaleString()}</p>
              <p>Opponent Name: {war.opponent.name}</p>
              <p>Opponent Tag: {war.opponent.tag}</p>
              <p>Team Size: {war.teamSize}</p>
              <p>Clan Stars: {war.clan.stars}</p>
              <p>Opponent Stars: {war.opponent.stars}</p>
              <p>Clan Destruction: {war.clan.destructionPercentage}%</p>
              <p>Opponent Destruction: {war.opponent.destructionPercentage}%</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
