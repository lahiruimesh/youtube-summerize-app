require('dotenv').config();
const express = require('express');
const { spawn } = require('child_process');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
app.use(cors());
app.use(express.json());

// Validate Gemini API key
if (!process.env.GEMINI_API_KEY) {
  console.error('ERROR: GEMINI_API_KEY is not set in .env file');
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/api/captions', (req, res) => {
  const { videoId } = req.body;

  if (!videoId || typeof videoId !== 'string') {
    return res.status(400).json({ error: 'Video ID is required' });
  }

  const python = spawn('python', ['get_captions.py', videoId]);

  let outputData = '';
  let errorData = '';

  const timeout = setTimeout(() => {
    python.kill();
    res.status(500).json({ error: 'Request timeout - Python process took too long' });
  }, 30000); // 30s timeout

  python.stdout.on('data', (data) => {
    outputData += data.toString();
  });

  python.stderr.on('data', (data) => {
    errorData += data.toString();
  });

  python.on('error', (err) => {
    clearTimeout(timeout);
    console.error('Failed to start Python process:', err);
    res.status(500).json({ error: 'Failed to start transcript processing' });
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
      console.error('Failed to parse JSON:', err);
      return res.status(500).json({ error: 'Failed to parse transcript' });
    }

    if (captions.error) {
      return res.status(400).json(captions);
    }

    const fullText = captions.map(snippet => snippet.text).join(' ').substring(0, 30000); // Gemini limit

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
    
      // Split summaryText into bullet points (assuming model uses new lines or '- ' or '• ')
      const points = summaryText
        .split(/\n|•|-/)  // split by new line or common bullet chars
        .map(p => p.trim())
        .filter(p => p.length > 0);
    
      res.json({ points });
    
    } catch (err) {
      console.error('Gemini API error:', err);
      res.status(500).json({ error: 'Failed to summarize transcript using Gemini' });
    }
  });
});

app.listen(5000, () => {
  console.log('✅ Server running on http://localhost:5000');
});
