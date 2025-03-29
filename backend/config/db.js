const mongoose = require('mongoose');
require('dotenv').config();

mongoose.set('strictQuery', false); 

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;



// // const mongoose = require("mongoose");
// const { MongoClient } = require("mongodb");
// require("dotenv").config();

// // Connection URL
// const url = process.env.MONGO_URI;

// // Database Name
// const dbName = "Cluster0";
// // mongoose.set("strictQuery", false);

// const client = new MongoClient(url);
// let db;
// const connectDB = async () => {
//   // try {
//   await client.connect();
//   console.log("Connected successfully to server");
//   // db = client.db(dbName);
//   // const collection = db.collection('documents');
//   //   mongoose.connect(process.env.MONGO_URI, {
//   //     useNewUrlParser: true,
//   //     useUnifiedTopology: true,
//   //   });
//   //   // console.log("MongoDB Connected...");
//   // } catch (err) {
//   //   console.error(err.message);
//   //   process.exit(1);
//   // }

//   // };
// };

// module.exports = {
//   client,
//   db,
// };