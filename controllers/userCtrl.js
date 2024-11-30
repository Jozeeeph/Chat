const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = (req,res,next)=>{
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
            role: req.body.role
        });
        user.save()
        .then(()=> res.status(201).json({message: 'Utilisateur cree !'}))
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: 'Invalid login/password' });
            }

            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ message: 'Invalid login/password' });
                    }

                    // Create a JWT token
                    const token = jwt.sign(
                        { userId: user._id },
                        'RANDOM_TOKEN_SECRET',
                        { expiresIn: '24h' }
                    );

                    // Set the token in a cookie
                    res.cookie('token', token, {
                        httpOnly: true,  // Make the cookie inaccessible to client-side JavaScript
                        secure: process.env.NODE_ENV === 'production',  // Set to true in production for HTTPS
                        maxAge: 24 * 60 * 60 * 1000  // Cookie expires after 24 hours
                    });

                    res.status(200).json({
                        message: 'Login successful',
                        userId: user._id
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};


exports.logout = (req, res, next) => {
    res.clearCookie('token');  // Clear the token cookie
    res.status(200).json({ message: 'Logout successful' });
};


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

exports.updateUser = (req,res,next) => {
    User.updateOne({_id:req.params.id}, {...req.body, _id:req.params.id})
    .then(() => res.status(200).json({message: 'User modified'}))
    .catch(error => res.status(400).json({error}));
};

exports.deleteUser = (req,res,next) => {
    User.deleteOne({_id:req.params.id})
    .then(() => res.status(200).json({message: 'User deleted'}))
    .catch(error => res.status(400).json({error}));
};


