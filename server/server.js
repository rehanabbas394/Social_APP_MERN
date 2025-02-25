const express = require("express");
const app = express();
const path = require("path");
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose");
const authroutes = require("./Routes/auth");
const userroutes = require("./Routes/users");
const postroutes = require("./Routes/post");
const multer = require("multer");
const dotenv = require("dotenv");
dotenv.config();

const port = process.env.PORT || 3000;

// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/socialmedia", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("MongoDB Connection Failed:", error);
  }
};
connectDB();

// Middleware
app.use(express.json()); 
app.use(helmet());
app.use(morgan("common"));
app.use("/images", express.static(path.join(__dirname, "public/images")));

// File upload setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploaded successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json("File upload failed");
  }
});

app.use("/api/auth", authroutes);
app.use("/api/user", userroutes);
app.use("/api/post", postroutes);

// Test Route
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Start Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
