

exports.getBootcamps = (req, res, next) => {
  res.status(200).json({
    success: true,
    message: 'OK',
    hello: req.hello
  })
}

exports.getBootcamp = (req, res, next) => {
  res.status(200).json({
    cing: `ceboi ${req.params.id}`
  })
}

exports.createBootcamp = (req, res, next) => {
  res.status(200).json({
    success: true,
    message: 'OK'
  })
}

exports.updateBootcamp = (req, res, next) => {
  res.status(200).json({
    success: true,
    message: 'OK'
  })
}

exports.deleteBootcamp = (req, res, next) => {
  res.status(200).json({
    success: true,
    message: 'OK'
  })
}