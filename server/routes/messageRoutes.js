// routes/messageRoutes.js
const express = require('express');
const messageController = require('../controllers/messageController');

const router = express.Router();

router.get('/api/messages/:roomId', messageController.getMessages);
router.post('/api/messages/:roomId', messageController.createMessage);
router.put('/api/messages/:roomId/:messageId', messageController.updateMessage);
router.delete('/api/messages/:roomId/:messageId', messageController.deleteMessage);

module.exports = router;
