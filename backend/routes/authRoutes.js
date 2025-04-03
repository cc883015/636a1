const express = require('express');
const { register, login } = require('../controllers/authController');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', protect, getProfile); //add 
router.put('/profile', protect, updateUserProfile); //讲解一下这部分
module.exports = router;
