require('dotenv').config(); // Add this line to load environment variables from a .env file

const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const helmet = require('helmet');
const app = express(); // Initialize app before using it
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(morgan('dev')); // Logging middleware
app.use(helmet()); // Security middleware 

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/paytm-clone', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB!');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});

const authRoutes = require('./routes/auth'); 

app.use('/api/auth', authRoutes);  

app.get('/', (req, res) => res.send('Welcome to Paytm Clone'));

// Centralized error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, () => console.log(`Server running on port ${port}`));
