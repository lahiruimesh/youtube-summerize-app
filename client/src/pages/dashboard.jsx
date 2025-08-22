import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineDownload, HiOutlineExternalLink, HiOutlineClipboard, HiOutlineChevronDown, HiOutlineChevronUp, HiOutlineLogout, HiOutlineTrash } from 'react-icons/hi';
import api from '../utils/api';

const Dashboard = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [summaries, setSummaries] = useState([]);
  const [isLoadingSummaries, setIsLoadingSummaries] = useState(false);
  const [expandedById, setExpandedById] = useState({});
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  // Fetch user info when component mounts
  useEffect(() => {
    const loadUser = async () => {
      setIsLoadingUser(true);
      try {
        const res = await api.get('/auth/user');
        setUser(res.data);
      } catch {
        setUser(null);
      } finally {
        setIsLoadingUser(false);
      }
    };
    loadUser();
  }, []);

  // Fetch summaries once user is available
  useEffect(() => {
    const loadSummaries = async () => {
      if (!user) return;
      setIsLoadingSummaries(true);
      setError('');
      try {
        const res = await api.get('/api/user/summaries');
        setSummaries(res.data || []);
      } catch {
        setError('Failed to load your summaries. Please try again.');
      } finally {
        setIsLoadingSummaries(false);
      }
    };
    loadSummaries();
  }, [user]);

  const handleLogout = async () => {
    try {
      await api.get('/auth/logout');
      setUser(null);
      navigate('/');
    } catch {
      // noop
    }
  };

  const toggleExpand = (id) => {
    setExpandedById(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleDownloadPDF = (summaryId) => {
    window.open(`http://localhost:5000/api/user/summaries/${summaryId}/download`, '_blank');
  };

  const copySummary = async (points) => {
    try {
      await navigator.clipboard.writeText(points.join('\n'));
      alert('Summary copied to clipboard');
    } catch {
      alert('Failed to copy');
    }
  };

  const handleDeleteSummary = async (summaryId) => {
    if (!window.confirm('Are you sure you want to delete this summary? This action cannot be undone.')) {
      return;
    }

    setDeletingId(summaryId);
    try {
      await api.delete(`/api/user/summaries/${summaryId}`);
      setSummaries(prev => prev.filter(summary => summary._id !== summaryId));
      setError('');
    } catch (err) {
      setError('Failed to delete summary. Please try again.');
    } finally {
      setDeletingId(null);
    }
  };

  const youtubeUrlFor = (videoId) => `https://www.youtube.com/watch?v=${videoId}`;
  const youtubeThumbFor = (videoId) => `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  const hasSummaries = useMemo(() => (summaries && summaries.length > 0), [summaries]);

  // Loading state for user
  if (isLoadingUser) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16 mt-24">
        <div className="h-8 w-48 bg-gray-200 animate-pulse rounded mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="h-40 bg-gray-200 animate-pulse rounded" />
          <div className="h-40 bg-gray-200 animate-pulse rounded" />
          <div className="h-40 bg-gray-200 animate-pulse rounded" />
        </div>
      </div>
    );
  }

  // Not authenticated state
  if (!user) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="max-w-xl w-full text-center bg-white border rounded-2xl p-10 shadow-sm">
          <h1 className="text-3xl font-bold mb-3">Welcome back</h1>
          <p className="text-gray-600 mb-8">Sign in to view your saved video summaries and continue where you left off.</p>
          <div className="flex items-center justify-center gap-3">
            <a href="http://localhost:5000/auth/google" className="bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition">Sign in with Google</a>
            <button onClick={() => navigate('/')} className="px-5 py-2.5 rounded-lg border border-gray-300 hover:bg-gray-50 transition">Go Home</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 mt-28">
      {/* Top: User Card */}
      <div className="bg-gradient-to-r from-white to-gray-50 border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-lg transition flex items-center h-36 justify-between mb-16">
        {/* Left: Profile */}
        <div className="flex items-center gap-4 ml-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">
              Hello, <span className="text-red-600">{user.name}</span> 👋
            </h1>
            <p className="text-gray-500 text-sm">{user.email}</p>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3 mr-8">
          <button
            onClick={() => navigate('/summerize')}
            className="bg-gradient-to-r from-red-600 to-red-500 text-white px-5 py-2 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-transform"
          >
            🎬 Summarize a Video
          </button>
        </div>
      </div>

      {/* Summaries Section */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Your Summaries</h2>
        {hasSummaries && (
          <span className="text-sm text-gray-500">{summaries.length} item{summaries.length > 1 ? 's' : ''}</span>
        )}
      </div>

      {error && (
        <div className="mb-4 p-3 rounded bg-red-50 text-red-700 border border-red-200">{error}</div>
      )}

      {isLoadingSummaries ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="border rounded-2xl p-4 bg-white shadow-sm">
              <div className="h-40 bg-gray-200 animate-pulse rounded mb-4" />
              <div className="h-5 w-2/3 bg-gray-200 animate-pulse rounded mb-2" />
              <div className="h-4 w-1/2 bg-gray-200 animate-pulse rounded mb-4" />
              <div className="flex gap-2">
                <div className="h-9 w-24 bg-gray-200 animate-pulse rounded" />
                <div className="h-9 w-24 bg-gray-200 animate-pulse rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : hasSummaries ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {summaries.map((item) => (
            <div key={item._id} className="border rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition">
              <div className="w-full h-100 bg-gray-100">
                <img src={youtubeThumbFor(item.videoId)} alt="Video thumbnail" className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <a href={youtubeUrlFor(item.videoId)} target="_blank" rel="noreferrer" className="font-semibold text-gray-900 hover:text-red-600 flex items-center gap-1">
                    {item.videoId}
                    <HiOutlineExternalLink />
                  </a>
                  <span className="text-xs text-gray-500">{new Date(item.createdAt).toLocaleString()}</span>
                </div>

                {/* Summary preview (always 2 lines) */}
                {expandedById[item._id] ? (
                  <ul className="text-sm text-gray-700 list-disc pl-5 space-y-1 mb-3">
                    {item.summary.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {Array.isArray(item.summary) ? item.summary.join(' ') : ''}
                  </p>
                )}

              <div className="flex items-center justify-between w-full">
                {/* Show More / Show Less (Left) */}
                <button 
                  onClick={() => toggleExpand(item._id)} 
                  className="px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition flex items-center gap-2 text-sm"
                >
                  {expandedById[item._id] ? <HiOutlineChevronUp /> : <HiOutlineChevronDown />}
                  {expandedById[item._id] ? 'Show less' : 'Show more'}
                </button>

                {/* Right-side Buttons */}
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => copySummary(item.summary || [])} 
                    className="px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition flex items-center gap-2 text-sm"
                  >
                    <HiOutlineClipboard />
                  </button>
                  <button 
                    onClick={() => handleDownloadPDF(item._id)} 
                    className="px-3 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition flex items-center gap-2 text-sm"
                  >
                    <HiOutlineDownload />
                  </button>
                  <button 
                    onClick={() => handleDeleteSummary(item._id)}
                    disabled={deletingId === item._id}
                    className="px-3 py-2 rounded-lg border border-red-300 text-red-600 hover:bg-red-50 transition flex items-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <HiOutlineTrash />
                    {deletingId === item._id ? 'Deleting...' : ''}
                  </button>
                </div>
              </div>

              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white border rounded-2xl p-10 text-center shadow-sm">
          <h3 className="text-xl font-semibold mb-2">No summaries yet</h3>
          <p className="text-gray-600 mb-6">Start by summarizing a YouTube video. Your summaries will show up here.</p>
          <button onClick={() => navigate('/summerize')} className="bg-red-600 text-white px-5 py-2.5 rounded-lg hover:bg-red-700 transition">Summarize a video</button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
