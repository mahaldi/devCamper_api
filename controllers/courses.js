const Course = require("../models/Course")
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