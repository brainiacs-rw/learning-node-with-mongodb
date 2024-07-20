const mongoose = require('mongoose');

const DB_URL = process.env.MONGODB_CONNECTION

const dbConnection = async () => {
    try {
        await mongoose.connect(DB_URL);
        console.log('Database connected');
    } catch (error) {
        console.log(error);
        throw new Error('Unable to connect to database');
    }
}
module.exports = {
    dbConnection
}