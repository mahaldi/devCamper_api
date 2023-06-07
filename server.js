const express = require('express');
const env = require('dotenv');

const bootcamps = require('./routes/bootcamps');

env.config({ path: './config/config.env'});

const app = express();

const logger = (req, res, next) => {
    req.hello = 'hellow';
    console.log('middleware ran');
    next();
}
app.use(logger);

// mount routers
app.use('/api/v1/bootcamps', bootcamps);

const PORT = process.env.PORT || 6666;

app.listen(
    PORT,
    console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
