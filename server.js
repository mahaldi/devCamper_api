const express = require('express');
const env = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');

env.config({ path: './config/config.env'});

connectDB();

const bootcamps = require('./routes/bootcamps');

const app = express();
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// mount routers
app.use('/api/v1/bootcamps', bootcamps);

const PORT = process.env.PORT || 6666;

app.listen(
    PORT,
    console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
