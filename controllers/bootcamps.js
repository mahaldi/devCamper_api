const Bootcamp = require("../models/Bootcamp")


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

exports.createBootcamp = async (req, res, next) => {
  console.log('req.body', req.body)
  // const bootcamp = await Bootcamp.create(req.body)

  res.status(201).json({
    success: true,
    message: 'OK',
    // data: bootcamp
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