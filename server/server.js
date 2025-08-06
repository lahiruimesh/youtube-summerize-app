require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const { spawn } = require('child_process');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const cors = require('cors');

// Import your User & Summary mongoose models
const User = require('./models/user');        // your User model file path
const Summary = require('./models/summary');  // your Summary model file path

// Import your auth routes and passport config
const authRoutes = require('./routes/auth');
require('./config/passport');

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/auth', authRoutes);

// Google Gemini setup
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// POST /api/captions - summarize video transcript
app.post('/api/captions', async (req, res) => {
  const { videoId } = req.body;
  const user = req.user;

  if (!user) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  if (!videoId || typeof videoId !== 'string') {
    return res.status(400).json({ error: 'Video ID is required' });
  }

  const python = spawn('python', ['get_captions.py', videoId]);

  let outputData = '';
  let errorData = '';

  const timeout = setTimeout(() => {
    python.kill();
    return res.status(500).json({ error: 'Request timeout - Python process took too long' });
  }, 30000);

  python.stdout.on('data', data => {
    outputData += data.toString();
  });

  python.stderr.on('data', data => {
    errorData += data.toString();
  });

  python.on('error', err => {
    clearTimeout(timeout);
    console.error('Failed to start Python process:', err);
    return res.status(500).json({ error: 'Failed to start transcript processing' });
  });

  python.on('close', async (code) => {
    clearTimeout(timeout);

    if (code !== 0 || errorData) {
      console.error('Python error:', errorData);
      return res.status(500).json({ error: 'Failed to process video transcript' });
    }

    let captions;
    try {
      captions = JSON.parse(outputData);
    } catch (err) {
      console.error('Failed to parse JSON:', err, 'Output:', outputData);
      return res.status(500).json({ error: 'Failed to parse transcript JSON' });
    }

    if (!Array.isArray(captions)) {
      console.error('Captions is not an array:', captions);
      return res.status(500).json({ error: 'Invalid transcript format' });
    }

    const fullText = captions.map(snippet => snippet.text).join(' ').substring(0, 30000);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = [
        "You are a helpful assistant.",
        "Summarize this video transcript into 3 or 4 well-structured paragraphs.",
        "The summary should clearly explain the main ideas in a way that is easy to understand.",
        "Use simple, conversational language and avoid technical jargon unless necessary.",
        "Focus on clarity and flow; do not use bullet points or numbers.",
        "After the summary, write one paragraph summarizing the main theories or concepts discussed in the video.",
        "Then suggest 3 related video links or online resources with a brief description for each (around one sentence).",
        "Do not repeat information. Stay concise and informative.",
        "Here is the transcript:",
        fullText
      ];

      const result = await model.generateContent(prompt);
      const summaryText = result.response.text();

      // Split summaryText into bullet points
      const points = summaryText
        .split(/\n|•|-/)
        .map(p => p.trim())
        .filter(p => p.length > 0);

      // Save summary to DB
      const summary = new Summary({
        userId: user._id,
        videoId,
        summary: points,
        createdAt: new Date(),
      });

      await summary.save();

      res.json({ points });
    } catch (err) {
      console.error('Gemini API error:', err);
      res.status(500).json({ error: 'Failed to summarize transcript using Gemini' });
    }
  });
});

// GET /api/user/summaries - get summaries for logged in user
app.get('/api/user/summaries', async (req, res) => {
  if (!req.user) return res.status(401).json({ error: 'Not authenticated' });

  try {
    const summaries = await Summary.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(summaries);
  } catch (err) {
    console.error('Error fetching summaries:', err);
    res.status(500).json({ error: 'Failed to fetch summaries' });
  }
});

// Start server
app.listen(5000, () => console.log('✅ Server running on http://localhost:5000'));
