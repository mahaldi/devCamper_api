const Bootcamp = require("../models/Bootcamp")


exports.getBootcamps = async (req, res, next) => {
  try {
    const bootcamps = await Bootcamp.find()

    res.status(200).json({
      success: true,
      message: 'OK',
      data: bootcamps
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
      return res.status(404).json({
        success: false,
        messsage: 'not found'
      })
    }
    res.status(200).json({
      success: true,
      message: 'OK',
      data: bootcamp
    })
  } catch (error) {
    res.status(404).json({ // kalo dari format id nya salah dia masuk nya ke sini, walau aneh harusnya kalo ga ketemu balik aja ke sini dari mongodb nya
      success: false,
      messsage: 'not found'
    })
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
    res.status(400).json({
      success: false
    })
  }
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