const express = require('express');
const env = require('dotenv');

env.config({ path: './config/config.env'});

const app = express();

const PORT = process.env.PORT || 6666;

app.listen(
    PORT,
    console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
