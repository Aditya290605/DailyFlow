const serverless = require('serverless-http');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('../../server/routes/auth.routes'));
app.use('/api/data', require('../../server/routes/data.routes'));

// Cache MongoDB connection
let cachedDb = null;
const connectDb = async () => {
  if (cachedDb && mongoose.connection.readyState === 1) {
    return cachedDb;
  }
  console.log('Connecting to MongoDB Atlas (Serverless)...');
  cachedDb = await mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 5000,
  });
  return cachedDb;
};

const handler = serverless(app);

module.exports.handler = async (event, context) => {
  // Prevent Mongoose from keeping the Node event loop active, which causes Lambdas to timeout
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    await connectDb();
  } catch (err) {
    console.error('MongoDB connection error in Serverless Function:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to connect to database' }),
    };
  }

  return await handler(event, context);
};
