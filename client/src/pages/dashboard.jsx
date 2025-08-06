import React, { useEffect, useState } from 'react';
import api from '../utils/api';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [summaries, setSummaries] = useState([]);

  // Fetch user info when component mounts
  useEffect(() => {
    api.get('/auth/user')
      .then(res => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  // Fetch summaries once user is available
  useEffect(() => {
    if (user) {
      api.get('/api/user/summaries')
        .then(res => setSummaries(res.data))
        .catch(err => console.log(err));
    }
  }, [user]);

  const handleLogout = () => {
    window.location.href = 'http://localhost:5000/auth/logout';
  };

  // Show loading state until user info is loaded
  if (!user) {
    return <div>Loading user info...</div>;
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Welcome, {user.name} 👋</h1>
      <img src={user.photo} alt="Profile" width={100} style={{ borderRadius: '50%' }} />
      <p><strong>Email:</strong> {user.email}</p>
      <button onClick={handleLogout} style={{ marginTop: '1rem' }}>Logout</button>

      <h2 style={{ marginTop: '2rem' }}>Your Summaries</h2>
      {summaries.length === 0 ? (
        <p>No summaries found.</p>
      ) : (
        summaries.map((item, index) => (
          <div key={index} style={{ marginBottom: '1rem' }}>
            <p><strong>Video ID:</strong> {item.videoId}</p>
            <ul>
              {item.summary.map((point, i) => (
                <li key={i}>• {point}</li>
              ))}
            </ul>
            <small>{new Date(item.createdAt).toLocaleString()}</small>
          </div>
        ))
      )}
    </div>
  );
};

export default Dashboard;
