const Bootcamp = require("../models/Bootcamp")
const ErrorResponse = require('../utils/errorResponse')

exports.getBootcamps = async (req, res, next) => {
  try {
    const bootcamps = await Bootcamp.find()

    res.status(200).json({
      success: true,
      message: 'OK',
      data: bootcamps,
      total: bootcamps.length
    })
  } catch (error) {
    res.status(404).json({
      success: false,
      messsage: 'no record'
    })
  }
}

exports.getBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id)

    if(!bootcamp) { // kalo ga ketemu tapi format id nya bener
      return next(new ErrorResponse(`id not found`, 404))
    }

    res.status(200).json({
      success: true,
      message: 'OK',
      data: bootcamp
    })
  } catch (error) { // kalo dari format id nya salah dia masuk nya ke sini, walau aneh harusnya kalo ga ketemu balik aja ke sini dari mongodb nya
    next(error)
  }
}

exports.createBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.create(req.body)
  
    res.status(201).json({
      success: true,
      message: 'OK',
      data: bootcamp
    })
    
  } catch (error) {
    next(error)
  }
}

exports.updateBootcamp = async (req, res, next) => {

  try {
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
  } catch (error) {
    res.status(400).json({
      success: false
    })
  }
  
}

exports.deleteBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id)

    if(!bootcamp) return next(new ErrorResponse(`id not found`, 404))
    res.status(200).json({
      success: true,
      message: 'OK'
    })
  } catch (error) {
    next(error)
  }
}