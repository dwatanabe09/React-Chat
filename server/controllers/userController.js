
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

module.exports = {
  createUser: async (req, res) => {
    try {
      const { firstName, lastName, email, password } = req.body;


      if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'Email already in use' });
      }


      const newUser = await User.create({ firstName, lastName, email, password });


      const token = jwt.sign({ userId: newUser._id }, 'your_secret_key');

      res.json({ user: newUser, token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: 'Missing required fields' });
      }


      const existingUser = await User.findOne({ email, password });
      if (!existingUser) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }


      const token = jwt.sign({ userId: existingUser._id }, 'your_secret_key');

      res.json({ user: existingUser, token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getUserProfile: async (req, res) => {
    try {
      res.json({
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        email: req.user.email,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  updateUserProfile: async (req, res) => {
    try {
      const { firstName, lastName } = req.body;

      if (!firstName || !lastName) {
        return res.status(400).json({ error: 'Missing required fields' });
      }


      const updatedUser = await User.findByIdAndUpdate(
        req.user._id,
        { firstName, lastName },
        { new: true }
      );

      res.json({
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};
