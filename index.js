const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');
const postRoute = require('./routes/posts');
const commentRoute = require('./routes/comments');

dotenv.config();

// Database
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Database is connected successfully');
    } catch (error) {
        console.error('Database connection failed:', error.message);
    }
};

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use("/images", express.static(path.join(__dirname, "/images")));
app.use(cors({ origin: "https://blog-publishing-platform-fullstack1.vercel.app/", credentials: true }));
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/posts', postRoute);
app.use('/api/comments', commentRoute);

// Multer setup
const storage = multer.diskStorage({
    destination: (req, file, fn) => {
        fn(null, "images"); // Folder where images are saved
    },
    filename: (req, file, fn) => {
        fn(null,req.body.img)
    }
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
    if (!req.file) {
        return res.status(400).json("No file uploaded");
    }
    res.status(200).json("Image has been uploaded successfully!");
});

app.listen(process.env.PORT || 5000, () => {
    connectDB();
    console.log("App is running on port " + (process.env.PORT || 5000));
});
