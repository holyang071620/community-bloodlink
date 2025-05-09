require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000,  // 30 sec timeout
})
.then(() => console.log('✅ MongoDB connected to bloodlinkDB'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// MongoDB connection events (optional but useful for debugging)
mongoose.connection.on('connected', () => {
    console.log('✅ Mongoose event: connected');
});
mongoose.connection.on('error', (err) => {
    console.log('❌ Mongoose event: error', err);
});
mongoose.connection.on('disconnected', () => {
    console.log('❌ Mongoose event: disconnected');
});

// API routes
app.use('/api/donors', require('./routes/donors'));
app.use('/api/requests', require('./routes/requests'));
app.use('/api/stats', require('./routes/stats'));

// Serve frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
