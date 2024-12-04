const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require('path');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const ChatRoom = require('./models/ChatRoom');

const authMiddleware = require('./middleware/auth');  // Authentication middleware
const roleMiddleware = require('./middleware/role');

const app = express();

// Middleware setup
app.use(express.json());
app.use(cookieParser());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Import routes
const userRouter = require('./router/userRouter');
const chatRoomRoutes = require('./router/chatroomRouter');
const messageRouter = require('./router/messageRouter');

// Connect to MongoDB
mongoose.connect('mongodb+srv://jozeph01:Q9TeXYy5ahyDiI8o@cluster0.haqyrhf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('Connected to MongoDB'))
    .catch(() => console.error('MongoDB connection failed!'));

// CORS middleware
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Define routes
app.use('/api/auth', userRouter);
app.use('/api', chatRoomRoutes);
app.use('/api', messageRouter);

// Routes for views
app.get('/login', (req, res) => res.render('login'));

app.get('/dashboard',authMiddleware, async (req, res) => {
    const users = await User.find();
    
    res.render('dashboard', {users });
    
});


app.get('/chatrooms-page', async (req, res) => {
    try {
        const chatRooms = await ChatRoom.find().populate('participants', 'username email');
        res.render('chatrooms-page', { chatRooms });  // Ensure 'chatrooms-page.ejs' exists
    } catch (error) {
        console.error('Error fetching chat rooms:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = app;
