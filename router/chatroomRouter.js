const express = require('express');
const router = express.Router();
const chatRoomCtrl = require('../controllers/chatroomCtrl');

// Routes for managing chat rooms
router.post('/chatrooms', chatRoomCtrl.createChatRoom);
router.get('/chatrooms', chatRoomCtrl.getAllChatRooms);
router.get('/chatrooms/:id', chatRoomCtrl.getChatRoomById);
router.put('/chatrooms/:id/add', chatRoomCtrl.addParticipant);
router.put('/chatrooms/:id/remove', chatRoomCtrl.removeParticipant);
router.delete('/chatrooms/:id', chatRoomCtrl.deleteChatRoom);

module.exports = router;
