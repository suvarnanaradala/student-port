const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// ✅ Serve the public folder so index.html works
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Route to serve the homepage manually (for safety)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ✅ API route for student data
app.get('/students', (req, res) => {
  fs.readFile(path.join(__dirname, 'student.json.txt'), 'utf-8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(500).json({ error: 'Error reading student data' });
    }
    try {
      const students = JSON.parse(data);
      res.json(students);
    } catch (error) {
      console.error('Error parsing JSON:', error);
      res.status(500).json({ error: 'Invalid JSON format' });
    }
  });
});

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
