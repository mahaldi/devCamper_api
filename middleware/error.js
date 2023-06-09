const ErrorHandler = require('../utils/errorResponse')

const errorHandler = (err, req, res, next) => {
  console.log(err)
  console.log(err.message)
  let error = { ...err }
  error.message = err.message
  error.statusCode = err.statusCode

  if(err.name === 'CastError') {
    const message = `id ${error.value} not found`
    error = new ErrorHandler(message, 404)
  }
  if(err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(item => item.message)
    error = new ErrorHandler(messages, 404)
  }
  if(err.code === 11000) {
    const message = `Duplicate field value`
    error = new ErrorHandler(message, 404)
  }
  res.status(error.statusCode || 500).json({
    message: error.message || 'Unknown Error',
    success: false
  })
    
}

module.exports = errorHandler;