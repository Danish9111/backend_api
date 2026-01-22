

const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const authMiddleWare = require('./middleware/auth');
const AppError = require('./utils/AppError');
const errorHandler = require('./middleware/errorHandler');
const upload = require('./config/multer');
const User = require('./models/User');
const Product = require('./models/Product');

const { body, validationResult } = require('express-validator');

// Routes
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');

dotenv.config();

const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI)
    .then(() => console.log('✅connected to mongoDB'))
    .catch((e) => console.log('❌error connecting to mongoose', e));
const app = express();

app.use(express.json());
const port = process.env.port || 3000;

app.use('/auth', authRoutes);
app.use('/products', productRoutes);


app.post('/upload', authMiddleWare, upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            throw new AppError("Please upload an image", 400)
        }
        res.status(200).json({
            message: "Image uploaded successfully",
            data: req.file,
            success: true,
        })

    } catch (error) {
        return res.status(500).json({
            message: "Internal server errors",
            error: error.message,
            success: false,
        })
    }
})

app.use(errorHandler);
app.listen(port, () => {
    console.log(`✅✅Server is running on port ${port}`)
})



