const express = require('express');
const app = express();

app.use(express.json()); 

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.post('/api/sort-string', (req, res) => {
  try {
    const inputString = req.body.data;

    if (inputString === undefined || inputString === null) {
      return res.status(400).json({ error: 'Missing "data" field in request body' });
    }

    if (typeof inputString !== 'string') {
      return res.status(400).json({ error: '"data" must be a string' });
    }

    const sortedArray = inputString.split('').sort();
    res.json({ word: sortedArray });

  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/sort-string', (req, res) => {
  res.status(405).json({ 
    message: 'Method not allowed', 
    instruction: 'Send a POST request with { "data": "your-string" }' 
  });
});

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Handle 404
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

module.exports = app;
