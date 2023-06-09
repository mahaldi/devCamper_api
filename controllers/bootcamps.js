const Bootcamp = require("../models/Bootcamp")
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')

exports.getBootcamps = asyncHandler(async (req, res, next) => {

  const bootcamps = await Bootcamp.find()

  res.status(200).json({
    success: true,
    message: 'OK',
    data: bootcamps,
    total: bootcamps.length
  })
})

exports.getBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id)

  if(!bootcamp) { // kalo ga ketemu tapi format id nya bener
    return next(new ErrorResponse(`id not found`, 404))
  }

  res.status(200).json({
    success: true,
    message: 'OK',
    data: bootcamp
  })
})

exports.createBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body)

  res.status(201).json({
    success: true,
    message: 'OK',
    data: bootcamp
  }) 
})

exports.updateBootcamp = asyncHandler(async (req, res, next) => {

  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true, // untuk response nanti balikannya yang terbaru
    runValidators: true // untuk tetep jalanin validasi yang ada di schema
  })

  if(!bootcamp) return next(new ErrorResponse(`id not found`, 404))

  res.status(200).json({
    success: true,
    message: 'OK',
    data: bootcamp
  })
  
})

exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id)

  if(!bootcamp) return next(new ErrorResponse(`id not found`, 404))
  res.status(200).json({
    success: true,
    message: 'OK'
  })
})