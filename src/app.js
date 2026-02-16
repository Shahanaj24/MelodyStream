const express = require('express');
const cookies = require('cookie-parser');
const cookieParser = require('cookie-parser');
// const authMiddleware = require('../middleware/auth.middleware');  
const userRoute = require('./routes/auth.route');
const musicRoute = require('./routes/music.route');
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", userRoute);  
app.use("/api/music", musicRoute);  

module.exports = app;