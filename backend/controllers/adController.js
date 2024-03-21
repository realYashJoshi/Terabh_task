// controllers/adController.js
const Ad = require('../models/Ad');
const User = require('../models/User'); // Import the User model if not already imported

exports.createAd = async (req, res) => {
    console.log(req.body);
  const { adContent, targets,createdBy } = req.body;
 
  
  try {
    // Create the ad
    const ad = new Ad({
      content: adContent,
      targets,
      createdBy,
    });
    // Save the ad to the database
    await ad.save();
    res.status(201).json({ message: 'Ad created successfully', ad });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
