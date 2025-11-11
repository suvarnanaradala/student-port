const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000; // Dynamic port for Render

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Homepage route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API route for student data
app.get('/students', (req, res) => {
  fs.readFile(path.join(__dirname, 'student.json'), 'utf-8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(500).json({ error: 'Error reading student data' });
    }
    try {
      const students = JSON.parse(data);
      res.setHeader('Content-Type', 'application/json');
      res.json(students);
    } catch (error) {
      console.error('Error parsing JSON:', error);
      res.status(500).json({ error: 'Invalid JSON format' });
    }
  });
});

// Catch-all route to serve index.html for client-side routing (Express 5 compatible)
app.get('/:any(*)', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at port ${PORT}`);
});
