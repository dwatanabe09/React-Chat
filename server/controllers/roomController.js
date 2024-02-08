
const Room = require('../models/roomModel');

module.exports = {
  createRoom: async (req, res) => {
    try {
      const { name, description, addedUsers } = req.body;


      if (!name) {
        return res.status(400).json({ error: 'Missing required fields' });
      }


      const existingRoom = await Room.findOne({ name });
      if (existingRoom) {
        return res.status(400).json({ error: 'Room name already in use' });
      }


      const newRoom = await Room.create({ name, description, addedUsers: [req.user._id] });

      res.json(newRoom);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getRooms: async (req, res) => {
    try {

      const rooms = await Room.find();

      res.json(rooms);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },


  updateRoom: async (req, res) => {
    try {
      const { name, description } = req.body;


      if (!name) {
        return res.status(400).json({ error: 'Missing required fields' });
      }


      const room = await Room.findById(req.params.roomId);
      if (!room) {
        return res.status(404).json({ error: 'Room not found' });
      }


      if (room.addedUsers[0].toString() !== req.user._id.toString()) {
        return res.status(403).json({ error: 'Unauthorized - User not the owner of the room' });
      }

      const updatedRoom = await Room.findByIdAndUpdate(
        req.params.roomId,
        { name, description },
        { new: true }
      );

      res.json(updatedRoom);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },


  deleteRoom: async (req, res) => {
    try {

      const room = await Room.findById(req.params.roomId);
      if (!room) {
        return res.status(404).json({ error: 'Room not found' });
      }

      if (room.addedUsers[0].toString() !== req.user._id.toString()) {
        return res.status(403).json({ error: 'Unauthorized - User not the owner of the room' });
      }

      await Room.findByIdAndDelete(req.params.roomId);

      res.json({ message: 'Room deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};
