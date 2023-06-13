const Course = require("../models/Course")
const Bootcamp = require("../models/Bootcamp")
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')

exports.getCourses = asyncHandler(async (req, res, next) => {
  const { params: { bootcampId } } = req
  let query;

  if(bootcampId) { // contoh url nya jadi gini bootcamps/5d713995b721c3bb38c1f5d0/courses/ id nya id dari bootcamp
    query = Course.find({ bootcamp: bootcampId })
  } else {
    query = Course.find().populate({
      path: 'bootcamp',
      select: 'name description'
    })
  }
  const course = await query;

  res.status(200).json({
    data: course,
    total: course.length,
    success: true
  })
})

exports.getCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id)

  if(!course) return next(new ErrorResponse(`id not found ${req.params.id}`, 404))

  res.status(200).json({
    data: course,
    success: true,
    message: 'OK'
  })
})

exports.createCourse = asyncHandler(async(req, res, next) => {
 // /bootcamps/5d713995b721c3bb38c1f5d0/courses
  const bootcamp = await Bootcamp.findById(req.params.bootcampId)

  if(!bootcamp) return next(new ErrorResponse(`id bootcamp not found ${req.params.id}`, 404))

  req.body.bootcamp = req.params.bootcampId
  const course = await Course.create(req.body)

  res.status(200).json({
    data: course,
    success: true,
    message: 'Created'
  })
})

exports.updateCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  })
  if(!course) return next(new ErrorResponse(`id not found ${req.params.id}`, 404))

  res.status(200).json({
    data: course,
    success: true,
    message: 'Updated'
  })
})

exports.deleteCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findOneAndDelete(req.params.id)

  if(!course) return next(new ErrorResponse(`id not found ${req.params.id}`, 404))

  res.status(200).json({
    data: {},
    success: true,
    message: 'Deleted'
  })
})