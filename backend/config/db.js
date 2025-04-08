// import mongoose library
const mongoose = require('mongoose');
// load environment variables
require('dotenv').config();
// connect to mongo using mongoose
const connectDB = async () => {
try {
await mongoose.connect(process.env.MONGODB_URI, {
    
 useNewUrlParser: true,
useUnifiedTopology: true, // ✅ Fixed typo

        });

        console.log('Mongo URI:', process.env.MONGODB_URI); // ✅ Correct variable name

        console.log('✅ MongoDB connected');

    } catch (err) {

        console.error('❌ MongoDB connection error:', err.message);

        process.exit(1); // Exit app if error
    }

};

module.exports = connectDB;
