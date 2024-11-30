const express = require('express');
const router = express.Router();
const messageCtrl = require('../controllers/messageCtrl');



router.post('/messages', messageCtrl.createMessage);
router.get('/messages', messageCtrl.getAllMessages);
router.get('/messages/sender/:senderId', messageCtrl.getMessagesBySender);
router.delete('/messages/:id', messageCtrl.deleteMessage);
router.put('/messages/:id', messageCtrl.updateMessage);

module.exports = router;