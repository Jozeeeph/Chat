const mongoose = require('mongoose');

const chatRoomSchema = new mongoose.Schema({
    roomName: {
        type: String,
        required: true
    },
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }]
});

module.exports = mongoose.model('ChatRoom', chatRoomSchema);
