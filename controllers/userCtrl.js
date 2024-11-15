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

exports.login = (req,res,next)=>{
User.findOne({email: req.body.email })
.then(user => {
    if(!user){
        return res.status(401).json({ message: 'Paire login/mot de passe incorrecte'});
    }
    bcrypt.compare(req.body.password, user.password)
    .then(valid => {
        if(!valid){
            return res.status(401).json({ message: 'Paire login/mot de passe incorrecte'});
        }
        res.status(200).json({
            userId: user._id,
            token: jwt.sign(
                {userId: user._id},
            'RANDOM_TOKEN_SECRET',
            {expiresIn: '24h'}
            )
        });
    })
    .catch(error => res.status(500).json({ error }));
})
.catch(error => res.status(500).json({ error }));
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


