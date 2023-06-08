const express = require('express');
const env = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');
const colors = require('colors');
const errorHandler = require('./middleware/error');

env.config({ path: './config/config.env' });

connectDB();

const bootcamps = require('./routes/bootcamps');

const app = express();

// body parser
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// mount routers
app.use('/api/v1/bootcamps', bootcamps);
app.use(errorHandler);
const PORT = process.env.PORT || 6666;

const server = app.listen(
  PORT,
  console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
);

process.on('unhandledRejection', (err, promise) => {
  console.log(`error: ${err.message}`.red.bold);
  server.close(() => {
    process.exit(1);
  });
})