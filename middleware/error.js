const errorHandler = (err, req, res, next) => {
  console.log(err.stack.red)

  res.status(500).json({
    message: err.message,
    success: false
  })
    
}

module.exports = errorHandler;