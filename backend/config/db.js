const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        console.warn(`Please set MONGO_URI in your .env file!`);
        // We do not exit process so server can still serve pages / show error
        // process.exit(1);
    }
};

module.exports = connectDB;
