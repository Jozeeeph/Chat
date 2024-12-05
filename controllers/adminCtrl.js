const admin = require('../models/Admin');
const User = require('../models/User');
const mongoose = require('mongoose');



exports.getAllUsers = (req,res,next) => {
    User.find()
    .then(users => res.status(200).json(users))
    .catch(error => res.status(400).json({error}));
};

exports.banUser = (req, res, next) => {
    User.updateOne({ _id: req.params.id }, { banned: true })
        .then(() => res.status(200).json({ message: 'User banned successfully!' }))
        .catch(error => res.status(400).json({ error }));
};


exports.toggleBan = (req, res, next) => {
    const userId = req.params.id;
    User.findById(userId)
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Toggle the banned status
            user.banned = !user.banned;
            return user.save();
        })
        .then(updatedUser => {
            res.status(200).json({ message: updatedUser.banned ? 'User banned' : 'User unbanned', banned: updatedUser.banned });
        })
        .catch(error => {
            res.status(500).json({ error: 'Failed to toggle ban status' });
        });
};


exports.updateUser = async (req, res, next) => {
    const { username, email, role, status, banned, password } = req.body;
    // Build update object dynamically
    const updateData = { username, email, role, status, banned };
    // Handle optional password update
    if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        updateData.password = hashedPassword;
    }
    try {
        await User.updateOne({ _id: req.params.id }, updateData);
        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        res.status(400).json({ error });
    }
};

exports.deleteUser = (req,res,next) => {
    User.deleteOne({_id:req.params.id})
    .then(() => res.status(200).json({message: 'User deleted'}))
    .catch(error => res.status(400).json({error}));
};
