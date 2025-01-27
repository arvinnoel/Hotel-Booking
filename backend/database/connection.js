require('dotenv').config();
const mongoose = require('mongoose');

function RunServer() {
    const mongoURI = process.env.MONGO_URI;
    
    if (!mongoURI) {
        console.error('MONGO_URI is not defined');
        return;
    }
    try {
        mongoose.connect(mongoURI);
        console.log('Mongoose connected');
    } catch (error) {
        console.log('Error connecting to MongoDB:', error);
    }
}

module.exports = RunServer;
