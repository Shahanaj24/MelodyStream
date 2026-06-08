const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const userRoute = require('./routes/auth.route');
const musicRoute = require('./routes/music.route');
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  }),
);
app.use('/api/auth', userRoute);
app.use('/api/music', musicRoute);

module.exports = app;