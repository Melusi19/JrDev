const express = require('express');
const app = express();

app.use(express.json());

app.post('/api/sort-string', (req, res) => {
    try {
        const inputString = req.body.data;

        if (!inputString) {
            return res.status(400).json({ error: 'Field "data" is required.' });
        }

        if (typeof inputString !== 'string') {
            return res.status(400).json({ error: '"data" must be a string.' });
        }

        const charArray = inputString.split('');
        const sortedArray = charArray.sort();

        res.json({ word: sortedArray });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = app;
