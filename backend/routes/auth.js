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

module.exports = router;
