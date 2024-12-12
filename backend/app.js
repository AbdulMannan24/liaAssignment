const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 3000;

// middlewares
app.use(express.json());
app.use(cors());


// routes 
const feedbackRoutes = require('./routes/feedback');
app.use('/feedback', feedbackRoutes);

app.listen(PORT, async () => {
    try {
      await connectDB();
      console.log(`Server started: ${PORT}`);
    } catch (error) {
      console.error('Failed to connect to database:', error);
      process.exit(1);
    }
});
