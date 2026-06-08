const Spotify = require('../models/spotify.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

async function register(req, res) {
  const { username, email, password, role = 'user' } = req.body;

  const ifUserExist = await Spotify.findOne({
    $or: [{ username }, { email }],
  });

  if (ifUserExist) {
    return res.status(400).json({
      message: 'User already exists',
    });
  }

  const hash = await bcrypt.hash(password, 10);
  const user = await Spotify.create({
    username,
    email,
    password: hash,
    role,
  });

  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
  );

  res.cookie('token', token, {
    httpOnly: true,
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    secure: process.env.NODE_ENV === 'production',
  });

  return res.status(201).json({
    message: 'User registered successfully',
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
  });
}

async function login(req, res) {
  const { username, email, password } = req.body;
  const user = await Spotify.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    return res.status(401).json({
      message: 'Invalid credentials',
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({
      message: 'Invalid credentials',
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
  );

  res.cookie('token', token, {
    httpOnly: true,
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    secure: process.env.NODE_ENV === 'production',
  });

  return res.status(200).json({
    message: 'Login successful',
    user: {
      username: user.username,
      email: user.email,
      role: user.role,
    },
  });
}

async function logout(req, res) {
  res.clearCookie('token', {
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    secure: process.env.NODE_ENV === 'production',
  });
  return res.status(200).json({
    message: 'Logout successful',
  });
}

module.exports = { register, login, logout };
