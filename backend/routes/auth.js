const express = require('express');
const router = express.Router();

// POST /api/auth/register
router.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  
  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields required" });
  }

  // for now just send success
  res.status(201).json({ message: "User registered", user: { name, email } });
});

// POST /api/auth/login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password required" });
  }

  // 👉 For now, just mock login
  if (email === "test@example.com" && password === "123456") {
    return res.status(200).json({ message: "Login successful", token: "fake-jwt-token" });
  } else {
    return res.status(401).json({ error: "Invalid credentials" });
  }
});

module.exports = router;
