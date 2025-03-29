const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');

const reviewRoutes = require('./routes/reviewRoutes');


const app = express();

// 连接数据库
connectDB();

// 中间件
app.use(cors());
app.use(express.json());

// 路由
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

app.use('/api/reviews', reviewRoutes);

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



// const express = require("express");
// const cors = require("cors");
// const connectDB = require("./config/db");

// require("dotenv").config();

// const authRoutes = require("./routes/authRoutes");
// const productRoutes = require('./routes/productRoutes');
// const reviewRoutes = require("./routes/reviewRoutes");

// const app = express();

// // 连接数据库
// // connectDB();

// // 中间件
// app.use(cors());
// app.use(express.json());

// // 路由
// app.use("/api/auth", authRoutes);
// app.use("/api/products", productRoutes);
// app.use("/api/reviews", reviewRoutes);

// const PORT = 5002;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));