const Message = require('../models/Message');


// Create a new message
exports.createMessage = (req, res, next) => {
    const newMessage = new Message({
        sender: req.body.sender,  // User ID
        content: req.body.content  // Message content
    });

    newMessage.save() // Save to DB
        .then(() => res.status(201).json({ message: 'Message created successfully' }))
        .catch(error => res.status(400).json({ error }));
};


// Get all messages
exports.getAllMessages = (req, res, next) => {
    Message.find()
        .populate('sender', 'username email')
        .then(messages => res.status(200).json(messages))
        .catch(error => res.status(400).json({ error }));
};

// Get messages by sender ID
exports.getMessagesBySender = (req, res, next) => {
    Message.find({ sender: req.params.senderId })
        .populate('sender', 'username email')
        .then(messages => res.status(200).json(messages))
        .catch(error => res.status(400).json({ error }));
};

// Delete a message by ID
exports.deleteMessage = (req, res, next) => {
    Message.findByIdAndDelete(req.params.id)
        .then(() => res.status(200).json({ message: 'Message deleted successfully!' }))
        .catch(error => res.status(400).json({ error }));
};

// Update message content by ID
exports.updateMessage = (req, res, next) => {
    Message.findByIdAndUpdate(req.params.id, { content: req.body.content }, { new: true })
        .then(updatedMessage => res.status(200).json(updatedMessage))
        .catch(error => res.status(400).json({ error }));
};