const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = (req,res,next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
            role: req.body.role
        });
        user.save()
        .then(() => res.status(201).json({message: 'Utilisateur créé !'}))
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Compare the password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id, email: user.email }, "your_jwt_secret_key", { expiresIn: '24h' });

        // Set the token in a cookie (httpOnly and secure flags for better security)
        res.cookie('auth_token', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
        
        res.status(200).json({ message: 'Login successful', token });
        // Redirect to the dashboard route after successful login
        // return res.redirect('/dashboard'); // This will redirect to the dashboard route

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};


exports.logout = (req, res, next) => {
    res.clearCookie('auth_token');  
    res.status(200).json({ message: 'Logout successful' });
};

exports.getAllUsers = (req,res,next) => {
    User.find()
    .then(users => res.status(200).json(users))
    .catch(error => res.status(400).json({error}));
};
