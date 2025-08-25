const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');

dotenv.config();
const app = express();

// Middleware
// app.use(cors());
app.use(express.json()); // for parsing JSON request bodies

app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true
}));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// =========================
// 👉 REGISTER YOUR ROUTES HERE
// =========================
app.use('/api/auth', require('./routes/auth'));     // authentication routes
app.use('/api/excel', require('./routes/excel'));   // excel routes
app.use('/api/charts', require('./routes/chart'));  // chart routes
app.use('/api/admin', require('./routes/admin'));   // admin routes

// Root test route
app.get('/', (req, res) => {
  res.send('🚀 Server is running...');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.get("/api/ping", (req, res) => res.json({ pong: true }));