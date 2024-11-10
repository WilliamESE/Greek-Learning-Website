// server.js
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const mysql = require('mysql2');
const path = require('path');

const app = express();
const PORT = 5000; // Server will run on port 5000

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/build')));

const SECRET_KEY = 'your-secret-key';

// MySQL database configuration
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Update with your MySQL username
    password: 'suppus', // Update with your MySQL password
    database: 'greek'   // Replace with your MySQL database name
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Database connection error:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

// Login endpoint
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
      if (err) return res.status(500).json({ message: 'Database error' });
      if (results.length === 0) return res.status(400).json({ message: 'Invalid credentials' });

      const user = results[0];
      const id = user.id;
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) return res.status(400).json({ message: 'Invalid credentials' });

      // Generate JWT
      const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
      res.json({ token: token, id: id, admin: user.is_admin});
  });
});

app.post('/userprogress', async (req, res) => {
  //User id is in the request data
  const {userid} = req.body;
  const query = `
    SELECT u.*,
    (SELECT COUNT(*) FROM vocab_set) AS vocab_count, 
    (SELECT COUNT(*) FROM sent_set) AS sent_count, 
    (SELECT COUNT(*) FROM reading) as read_count, 
    (SELECT COUNT(*) FROM tense_set) AS tense_count
    FROM users AS u
    WHERE u.id = ?
  `;

  db.query(query, [userid], (err, result) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    if (result.length === 0) return res.status(400).json({ message: 'User not found' });

    // Get the user info
    const user = result[0];

    // Count the number of sets in each section
    db.query('SELECT type, COUNT(*) AS type_count FROM lessons GROUP BY type', (err, result2) => {
        if (err) return res.status(500).json({ message: 'Database error while counting sets' });

        // Combine the results into a single object
        const out = { ...user, lesson_counts: result2 };

        // Return output
        res.json(out);
    });
  });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
