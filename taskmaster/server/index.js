require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
// MongoDB Connection
const { MongoMemoryServer } = require('mongodb-memory-server');

const startServer = async () => {
    const localUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/dailyflow';

    try {
        await mongoose.connect(localUri, { serverSelectionTimeoutMS: 2000 });
        console.log('✅ Connected to Local MongoDB');
    } catch (err) {
        console.log('⚠️ Local MongoDB not found, starting in-memory instance...');
        try {
            // Ensure any previous connection attempt is cleaned up
            await mongoose.disconnect();

            const mongod = await MongoMemoryServer.create();
            const uri = mongod.getUri();
            console.log('Using In-Memory URI:', uri);
            await mongoose.connect(uri);
            console.log('✅ Connected to In-Memory MongoDB');
        } catch (memErr) {
            console.error('❌ Failed to start in-memory MongoDB:', memErr);
            process.exit(1);
        }
    }

    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
    });
};

startServer();
