import React, { useState, useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const LandingPage = () => {
  const [videoId, setVideoId] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [points, setPoints] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const summaryRef = useRef(); // Ref for the summary section

  const extractVideoId = (url) => {
    const regex = /(?:youtube\.com\/(?:.*v=|.*\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : '';
  };

  const handleUrlSubmit = () => {
    const extractedId = extractVideoId(youtubeUrl);
    if (extractedId) {
      setVideoId(extractedId);
      fetchCaptions(extractedId);
    } else {
      setError('Invalid YouTube URL.');
    }
  };

  const fetchCaptions = async (id) => {
    setError('');
    setPoints([]);
    const targetId = id || videoId;

    if (!targetId.trim()) {
      setError('Please enter a YouTube video ID');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/captions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ videoId: targetId }),
      });

      const data = await res.json();

      if (res.ok) {
        if (data.points && Array.isArray(data.points)) {
          setPoints(data.points);
        } else {
          setError('No summary points received');
        }
      } else {
        setError(data.error || 'Failed to fetch summary');
      }
    } catch {
      setError('Failed to fetch summary. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = async () => {
    const element = summaryRef.current;
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('video-summary.pdf');
  };

  return (
    <div
      style={{
        maxWidth: 700,
        margin: '3rem auto',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        padding: '0 1rem',
      }}
    >
      <h1 style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#333' }}>
        YouTube Video Summary
      </h1>

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Paste YouTube URL"
          value={youtubeUrl}
          onChange={(e) => setYoutubeUrl(e.target.value)}
          style={{
            padding: '0.75rem 1rem',
            width: '100%',
            border: '1px solid #ccc',
            borderRadius: 4,
            fontSize: '1rem',
            outline: 'none',
          }}
        />
        <button
          onClick={handleUrlSubmit}
          disabled={loading}
          style={{
            padding: '0.75rem 1rem',
            backgroundColor: loading ? '#6c757d' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: 4,
            cursor: loading ? 'not-allowed' : 'pointer',
            fontWeight: '600',
          }}
        >
          {loading ? 'Loading...' : 'Summarize'}
        </button>
      </div>

      {videoId && (
        <div style={{ margin: '1.5rem 0', textAlign: 'center' }}>
          <iframe
            width="100%"
            height="400"
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ borderRadius: '8px' }}
          />
        </div>
      )}

      {error && (
        <p
          role="alert"
          style={{
            color: '#dc3545',
            textAlign: 'center',
            marginTop: '1rem',
            fontWeight: '600',
            backgroundColor: '#f8d7da',
            padding: '0.75rem 1rem',
            borderRadius: 4,
          }}
        >
          {error}
        </p>
      )}

      {points.length > 0 && (
        <section
          ref={summaryRef}
          aria-label="Summary Points"
          style={{
            marginTop: '2rem',
            backgroundColor: 'white',
            padding: '1.5rem',
            borderRadius: 6,
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
          }}
        >
          <h2 style={{ marginBottom: '1rem', color: '#222' }}>Summary</h2>
          <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', lineHeight: 1.6 }}>
            {points.map((point, idx) => (
              <li key={idx} style={{ marginBottom: '0.75rem', fontSize: '1rem', color: '#444' }}>
                {point}
              </li>
            ))}
          </ul>

          <button
            onClick={downloadPDF}
            style={{
              marginTop: '1.5rem',
              padding: '0.75rem 1.5rem',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: 4,
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            📥 Download PDF
          </button>
        </section>
      )}
    </div>
  );
};

export default LandingPage;
