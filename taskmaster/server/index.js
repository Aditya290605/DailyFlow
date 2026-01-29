const path = require('path');
// Try loading from current dir or parent dir to support running from 'server/' or root
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
if (!process.env.MONGODB_URI) require('dotenv').config(); // Fallback to default logic if file not found above
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connection.on('connected', () => console.log('Mongoose connected'));
mongoose.connection.on('error', (err) => console.log('Mongoose error', err));
mongoose.connection.on('disconnected', () => console.log('Mongoose disconnected'));

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/data', require('./routes/data.routes'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'prod') {
    app.use(express.static(path.join(__dirname, '../build')));

    // Express 5 requires specific syntax for wildcards
    app.get(/.*/, (req, res) => {
        res.sendFile(path.resolve(__dirname, '../build/index.html'));
    });
} else {
    app.get('/', (req, res) => {
        res.send('DailyFlow API is running (Dev Mode)');
    });
}

const startServer = async () => {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 5000 });
        console.log('✅ Connected to MongoDB Atlas');
        console.log('ReadyState:', mongoose.connection.readyState);

        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });
    } catch (err) {
        console.error('❌ Failed to connect to MongoDB:', err);
        process.exit(1);
    }
};

startServer();
