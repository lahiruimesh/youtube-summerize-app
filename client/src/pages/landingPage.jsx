import React, { useState } from 'react';

const LandingPage = () => {
const [videoId, setVideoId] = useState('');
  const [captions, setCaptions] = useState([]);
  const [error, setError] = useState('');

  const fetchCaptions = async () => {
    setError('');
    setCaptions([]);

    try {
      const res = await fetch('http://localhost:5000/api/captions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ videoId }),
      });

      const data = await res.json();
      if (data.error) {
        setError(data.error);
      } else {
        setCaptions(data);
      }
    } catch (err) {
      setError('Failed to fetch captions');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>YouTube Caption Viewer</h2>
      <input
        type="text"
        value={videoId}
        onChange={(e) => setVideoId(e.target.value)}
        placeholder="Enter YouTube Video ID"
        style={{ padding: '0.5rem', width: '300px' }}
      />
      <button onClick={fetchCaptions} style={{ marginLeft: '10px', padding: '0.5rem' }}>
        Get Captions
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div style={{ marginTop: '1rem' }}>
        {captions.map((line, index) => (
          <p key={index}>
            <strong>{line.start.toFixed(2)}s:</strong> {line.text}
          </p>
        ))}
      </div>
    </div>
  );
}

export default LandingPage;