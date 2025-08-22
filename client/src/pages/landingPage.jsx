import React, { useState, useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import api from '../utils/api';

const LandingPage = () => {
  const [videoId, setVideoId] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [points, setPoints] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const summaryRef = useRef();

  // Extract YouTube video ID from URL
  const extractVideoId = (url) => {
    const regex = /(?:youtube\.com\/(?:.*v=|.*\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : '';
  };

  // Handle URL submit
  const handleUrlSubmit = () => {
    const extractedId = extractVideoId(youtubeUrl);
    if (extractedId) {
      setVideoId(extractedId);
      fetchCaptions(extractedId);
    } else {
      setError('Invalid YouTube URL.');
    }
  };

  // Fetch summary
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
      const res = await api.post('/api/captions', { videoId: targetId });
      const data = res.data;

      if (data.points && Array.isArray(data.points)) {
        setPoints(data.points);
      } else {
        setError('No summary points received');
      }
    } catch {
      setError('Failed to fetch summary. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Download as PDF
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
    <div className="max-w-3xl mt-20 mx-auto px-4 py-12 font-sans">
      {/* Title */}
      <h1 className="text-3xl md:text-3xl font-bold text-center text-gray-800 mb-8">
        YouTube Video Summary
      </h1>

      {/* Input Section */}
      <div className="flex gap-3 mb-6">
        <input
          type="text"
          placeholder="Paste YouTube URL"
          value={youtubeUrl}
          onChange={(e) => setYoutubeUrl(e.target.value)}
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-red-500 focus:outline-none"
        />
        <button
          onClick={handleUrlSubmit}
          disabled={loading}
          className={`px-6 py-3 rounded-lg font-semibold text-white transition 
            ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'}`}
        >
          {loading ? 'Loading...' : 'Summarize'}
        </button>
      </div>

      {/* Video Preview */}
      {videoId && (
        <div className="mb-8 rounded-xl overflow-hidden shadow-md">
          <iframe
            className="w-full h-80 md:h-96"
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 text-red-700 font-medium px-4 py-3 rounded-lg text-center mb-6">
          {error}
        </div>
      )}

      {/* Summary Section */}
      {points.length > 0 && (
        <section
          ref={summaryRef}
          className="bg-white shadow-md rounded-xl p-6"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Summary</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 leading-relaxed">
            {points.map((point, idx) => (
              <li key={idx}>{point}</li>
            ))}
          </ul>

          <button
            onClick={downloadPDF}
            className="mt-6 px-5 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md transition flex items-center gap-2"
          >
            📥 Download PDF
          </button>
        </section>
      )}
    </div>
  );
};

export default LandingPage;
