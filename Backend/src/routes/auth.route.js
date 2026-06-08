const express = require('express');
const authController = require('../controllers/auth.controller');

const Route = express.Router();

Route.post("/register", authController.register);
Route.post("/login", authController.login);
Route.post("/logout", authController.logout);

module.exports = Route;