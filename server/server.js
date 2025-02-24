const express = require('express');
const app = express();
const path = require('path');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');
const authroutes = require('./Routes/auth');
const userroutes = require('./Routes/user');
const postroutes = require('./Routes/post');
const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT || 3000;

// db connection
const connectDB = async () => {
    try {
      await mongoose.connect('mongodb://127.0.0.1:27017/', {
      });
      console.log('MongoDB Connected Successfully');
    } catch (error) {
      console.error('MongoDB Connection Failed:', error);
    }
};
connectDB();

// middleware 
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));



// routes
app.get('/', (req, res) => {
    res.send('Hello World');
});
app.route("api/auth/", authroutes);
app.route("api/user/", userroutes);
app.route("api/post/", postroutes);

// server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});