const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const todoRoutes = require('./routes/todoRoutes');
const errorHandler = require('./middleware/errorHandler');
const cors = require('cors');
dotenv.config();

// Connect to database
connectDB();

const app = express();

app.use(cors(
  {
    origin: 'http://localhost:3000',
    credentials: true
  }
));

// Middleware
app.use(express.json());

// Routes
app.use('/api/todos', todoRoutes);

// Error Handler Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
