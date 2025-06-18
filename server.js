const express = require('express');
const app = express();

app.use(express.json());

// POST endpoint
app.post('/api/sort-string', (req, res) => {
  try {
    const inputString = req.body.data;
    if (!inputString) return res.status(400).json({ error: 'Missing "data" field.' });
    if (typeof inputString !== 'string') return res.status(400).json({ error: '"data" must be a string.' });

    const sortedArray = inputString.split('').sort();
    res.json({ word: sortedArray });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/sort-string', (req, res) => {
  res.status(405).json({ error: 'Use POST with { "data": "string" }.' });
});

module.exports = app;
