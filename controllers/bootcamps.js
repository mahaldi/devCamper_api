const Bootcamp = require("../models/Bootcamp")
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')

exports.getBootcamps = asyncHandler(async (req, res, next) => {

  // contoh query params nya ?averageCost[gte]=6000
  // gte = greater than equal
  // gt = greater than
  // lte = less than equal
  const reqQuery = { ...req.query }
  const reservedField = ['select'] // kalo mau nampilin field tertentu doang
  reservedField.forEach(param => delete reqQuery[param])

  const queryString = JSON.stringify(reqQuery).replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`)
  const queryParsed = JSON.parse(queryString)
  let query = Bootcamp.find(queryParsed)

  const { select: selectQuery } = req.query

  if(selectQuery) {
    const selectField = selectQuery.split(',').join(' ') // keperluan mongoose pengennya gitu kalo mau select
    query = query.select(selectField) // contoh nya ?select=description,name maka bakal nampilin field name dan description doang
  }

  const bootcamps = await query
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