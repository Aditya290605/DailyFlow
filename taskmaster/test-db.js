require('dotenv').config();
const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI;
console.log('Testing connection to:', uri.replace(/:([^:@]+)@/, ':****@'));

async function testConnection() {
    try {
        console.log('Connecting...');
        await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
        console.log('✅ Connected successfully');

        console.log('Checking connection state:', mongoose.connection.readyState);

        const admin = mongoose.connection.db.admin();
        const info = await admin.serverStatus();
        console.log('Server version:', info.version);

        await mongoose.disconnect();
        console.log('Disconnected');
    } catch (err) {
        console.error('❌ Connection failed:', err);
    }
}

testConnection();
