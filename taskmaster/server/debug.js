require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5002; // Use distinct port

app.use(cors());
app.use(express.json());

const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connection.on('connected', () => console.log('Debug: Mongoose connected'));
mongoose.connection.on('error', (err) => console.log('Debug: Mongoose error', err));
mongoose.connection.on('disconnected', () => console.log('Debug: Mongoose disconnected'));

app.use('/api/auth', require('./routes/auth.routes'));

const start = async () => {
    try {
        console.log('Debug: Connecting to', MONGODB_URI.replace(/:([^:@]+)@/, ':****@'));
        await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 5000 });
        console.log('Debug: Connected. ReadyState:', mongoose.connection.readyState);

        app.listen(PORT, () => {
            console.log(`Debug: Server running on port ${PORT}`);
        });
    } catch (err) {
        console.error('Debug: Failed to connect', err);
    }
};

start();
