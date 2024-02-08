const express = require('express')
const roomController = require('../controllers/roomController')

const router = express.Router();

router.post('api/rooms', roomController.createRoom)
router.get('/api/rooms', roomController.getRooms)
router.put('/api/rooms/:roodId', roomController.updateRoom)
router.delete('/api/rooms/:roomId', roomController.deleteRoom)

module.exports = router;