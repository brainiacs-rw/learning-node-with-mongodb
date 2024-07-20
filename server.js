const express = require('express');

require('dotenv').config() // load environment variables

const {
    dbConnection
} = require('./models/index.js');

const { studentRouter } = require('./routes/student.router.js');

const app = express();

app.use(express.json());

const PORT = process.env.PORT;

app.use('/students', studentRouter);

dbConnection(); // connecting to the database

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
