const ChatRoom = require('../models/ChatRoom');

// Create a new chat room
exports.createChatRoom = (req, res) => {
    const chatRoom = new ChatRoom({
        roomName: req.body.roomName,
        participants: req.body.participants  // Array of user IDs
    });

    chatRoom.save()
        .then(() => res.status(201).json({ message: 'Chat room created successfully!' }))
        .catch(error => res.status(400).json({ error }));
};

// Get all chat rooms
exports.getAllChatRooms = (req, res) => {
    ChatRoom.find()
        .populate('participants', 'username email')
        .then(chatRooms => res.status(200).json(chatRooms))
        .catch(error => res.status(400).json({ error }));
};

// Get a specific chat room by ID
exports.getChatRoomById = (req, res) => {
    ChatRoom.findById(req.params.id)
        .populate('participants', 'username email')
        .then(chatRoom => {
            if (!chatRoom) {
                return res.status(404).json({ message: 'Chat room not found!' });
            }
            res.status(200).json(chatRoom);
        })
        .catch(error => res.status(400).json({ error }));
};


// Add a participant to a chat room
exports.addParticipant = (req, res) => {
    const userId = req.body.userId;  // Assuming userId is passed in the request body

    // Ensure that we only send one response
    ChatRoom.findById(req.params.id)
        .then(chatroom => {
            if (!chatroom) {
                return res.status(404).json({ message: 'Chatroom not found' });
            }

            // Check if the user is already a participant
            const isAlreadyParticipant = chatroom.participants.some(
                participant => participant._id.toString() === userId.toString()
            );

            if (isAlreadyParticipant) {
                return res.status(400).json({ message: 'User is already a participant' });
            }

            // Add the user to the participants array
            chatroom.participants.push({ _id: userId });

            return chatroom.save();
        })
        .then(updatedRoom => {
            // Send the response only once after the chatroom is updated
            console.log("user successfully added to" , updatedRoom);
            
            res.status(200).json(updatedRoom);
        })
        .catch(error => {
            // Ensure we don't send a response if one was already sent
            if (!res.headersSent) {
                res.status(500).json({ error: 'Failed to add participant' });
            }
        });
};

// Remove a participant from a chat room
exports.removeParticipant = (req, res) => {
    ChatRoom.findByIdAndUpdate(
        req.params.id,
        { $pull: { participants: req.body.userId } },  // Remove the specified participant
        { new: true }
    )
        .then(updatedRoom => res.status(200).json(updatedRoom))
        .catch(error => res.status(400).json({ error }));
};

// Delete a chat room by ID
exports.deleteChatRoom = (req, res) => {
    ChatRoom.findByIdAndDelete(req.params.id)
        .then(() => res.status(200).json({ message: 'Chat room deleted successfully!' }))
        .catch(error => res.status(400).json({ error }));
};
