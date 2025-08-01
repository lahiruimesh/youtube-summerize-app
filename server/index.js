// server/index.js
const express = require('express');
const { spawn } = require('child_process');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/captions', (req, res) => {
  const { videoId } = req.body;

  // Run the python script
  const python = spawn('python', ['get_captions.py', videoId]);

  let outputData = '';
  let errorData = '';

  python.stdout.on('data', (data) => {
    outputData += data.toString();
  });

  python.stderr.on('data', (data) => {
    errorData += data.toString();
  });

  python.on('close', (code) => {
    if (errorData) {
      console.error('Python error:', errorData);
    }

    try {
      // Try to parse Python script output as JSON
      const captions = JSON.parse(outputData);
      res.json(captions);
    } catch (err) {
      console.error('Failed to parse JSON:', err);
      console.error('Raw Python output:', outputData);
      res.status(500).json({ error: 'Failed to parse transcript' });
    }
  });
});


app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
