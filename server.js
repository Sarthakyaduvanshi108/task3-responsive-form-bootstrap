const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// EJS setup
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

// Temporary storage
let submissions = [];

// Home route
app.get('/', (req, res) => {
  res.render('index');
});

// Form submission route
app.post('/submit', (req, res) => {
  const { username, email, password } = req.body;

  // Server-side validation
  if (!username || !email || !password) {
    return res.send("Error: All fields are required!");
  }
  if (password.length < 6) {
    return res.send("Error: Password must be at least 6 characters!");
  }

  // Store validated data
  submissions.push({ username, email });
  res.render('result', { username, email });
});

// Server start
app.listen(3000, () => {
  console.log("✅ Server running on http://localhost:3000");
});
