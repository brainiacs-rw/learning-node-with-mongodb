const mongoose = require('mongoose');

const DB_URL = process.env.MONGODB_CONNECTION

mongoose.connect(DB_URL)
    .then(() => console.log('Connected!'));