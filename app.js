const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser()); 

const userRouter = require('./router/userRouter');
const chatRoomRoutes = require('./router/chatroomRouter');
const messageRouter = require('./router/messageRouter');

mongoose.connect('mongodb+srv://jozeph01:Q9TeXYy5ahyDiI8o@cluster0.haqyrhf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


app.use('/api/auth',userRouter);
app.use('/api',chatRoomRoutes);
app.use('/api',messageRouter);


module.exports = app;