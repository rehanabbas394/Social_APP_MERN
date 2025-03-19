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
const cors = require("cors");
const fs = require("fs");
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
app.use("/images", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
}, express.static(path.join(__dirname, "public/images")));


app.use(cors({
  origin: "http://localhost:5173", // Allow frontend URL
  methods: "GET, POST, PUT, DELETE, OPTIONS",
  allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  credentials: true
}));

// Handle preflight requests
app.options("*", cors());

// Define upload path
const uploads = path.join(__dirname, "public/images");

// Ensure upload directory exists
if (!fs.existsSync(uploads)) {
  fs.mkdirSync(uploads, { recursive: true });
}

// File upload setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploads);
  },
  filename: (req, file, cb) => {
    if (!file) {
      return cb(new Error("File is missing"), null);
    }

    // Ensure req.body.name is valid
    const filename = req.body.name || `${Date.now()}_${file.originalname}`;
    cb(null, filename);
  },
});

// Initialize multer
const upload = multer({ storage });

// API route for file upload
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    res.status(200).json({ message: "File uploaded successfully", file: req.file.filename });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "File upload failed", error });
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
