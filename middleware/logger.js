
const logger = (req, res, next) => {
    req.hello = 'hellow';
    console.log(`middleware ran method: ${req.method} protocol: ${req.protocol} originalUrl: ${req.originalUrl}`);
    next();
}

module.exports = logger;