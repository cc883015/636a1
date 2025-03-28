// backend/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

// 注册 & 登录
router.post('/register', register);
router.post('/login', login);

module.exports = router;
