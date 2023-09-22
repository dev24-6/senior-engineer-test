const mongoose = require("mongoose");

// Asynchronous conenction function
const connectDB = async () => {
    try {
        // Set Mongoose options. `strictQuery` to don't show warnings
        mongoose.set("strictQuery", false);

        // Create the connection
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`DB connected ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectDB;