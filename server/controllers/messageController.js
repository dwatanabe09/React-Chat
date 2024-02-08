// controllers/messageController.js
const Message = require('../models/messageModel');

module.exports = {
  getMessages: async (req, res) => {
    try {
      const messages = await Message.find({ room: req.params.roomId })
        .populate('user', 'firstName lastName')
        .sort({ timestamp: 'asc' });

      res.json(messages);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  createMessage: async (req, res) => {
    try {
      const { body } = req.body;

      // Validation
      if (!body) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      // Create a new message in a room
      const newMessage = await Message.create({
        user: req.user._id,
        room: req.params.roomId,
        body,
      });

      res.json(newMessage);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  updateMessage: async (req, res) => {
    try {
      const { body } = req.body;

      // Validation
      if (!body) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      // Update a message in a room
      const updatedMessage = await Message.findByIdAndUpdate(
        req.params.messageId,
        { body },
        { new: true }
      );

      res.json(updatedMessage);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  deleteMessage: async (req, res) => {
    try {
      // Delete a message in a room
      await Message.findByIdAndDelete(req.params.messageId);

      res.json({ message: 'Message deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};
