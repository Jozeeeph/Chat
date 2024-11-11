const express = require('express');
const router = expres.Router();

const userCtrl = require('../controllers/userCtrl');

router.post('/signup',userCtrl.signup);
router.post('/login',userCtrl.login);