// routes/adsRoutes.js

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Ad = require('../models/Ad');

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const token = req.header('Authorization').split(' ')[1];
  console.log("this is user token",token);
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, 'secret123');
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

// Route to fetch ads targeted towards the authenticated viewer
router.get('/', verifyToken, async (req, res) => {
  try {
    // Extract user ID from authenticated request
    const userId = req.user.id;

    // Fetch ads targeted towards the viewer
    const ads = await Ad.find({ targets: userId });
    res.json(ads);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
