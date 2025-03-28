// backend/config/db.js

require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB 连接成功');

    // 数据库连接后，检查并创建默认管理员
    await createAdminUser();
  } catch (err) {
    console.error('数据库连接失败:', err);
    process.exit(1);
  }
};

// 创建默认管理员账号
async function createAdminUser() {
  try {
    // 查询是否已存在 username: admin 的用户
    const existingAdmin = await User.findOne({ username: 'admin' });
    if (!existingAdmin) {
      // 不存在则创建
      const hashedPassword = await bcrypt.hash('123456', 10);
      const newAdmin = new User({
        username: 'admin',
        email: 'admin@example.com',  // 你可以自行修改
        password: hashedPassword,
        role: 'admin'
      });
      await newAdmin.save();
      console.log('默认管理员账号已创建 -> 用户名: admin, 密码: 123456');
    } else {
      console.log('管理员账号已存在，无需创建');
    }
  } catch (error) {
    console.error('创建管理员账号失败:', error);
  }
}

module.exports = connectDB;
