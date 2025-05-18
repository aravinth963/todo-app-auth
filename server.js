require('dotenv').config({ path: './backend/.env' });
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/todos', require('./routes/todoRoutes'));

// Connect DB and start server
connectDB().then(() => {
  app.listen(3000, () => {
    console.log('✅ Server started on port 3000');
  });
});

