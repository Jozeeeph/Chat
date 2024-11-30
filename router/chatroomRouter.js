const express = require('express');
const router = express.Router();
const chatRoomCtrl = require('../controllers/chatroomCtrl');

// Routes for managing chat rooms
router.post('/chatrooms', chatRoomCtrl.createChatRoom);               // Create a new chat room
router.get('/chatrooms', chatRoomCtrl.getAllChatRooms);               // Get all chat rooms
router.get('/chatrooms/:id', chatRoomCtrl.getChatRoomById);           // Get a specific chat room by ID
router.put('/chatrooms/:id/add', chatRoomCtrl.addParticipant);        // Add a participant to a chat room
router.put('/chatrooms/:id/remove', chatRoomCtrl.removeParticipant);  // Remove a participant from a chat room
router.delete('/chatrooms/:id', chatRoomCtrl.deleteChatRoom);         // Delete a chat room by ID

module.exports = router;
