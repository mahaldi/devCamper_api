const mongoose = require('mongoose')

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'please add title course'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'please add description course'],
    trim: true
  },
  weeks: {
    type: String,
    required: [true, 'please add number of weeks course'],
    trim: true
  },
  tuition: {
    type: Number,
    required: [true, 'please add tuition cost']
  },
  minimumSkill: {
    type: String,
    required: [true, 'please add minimum skill'],
    enum: ['beginner', 'intermediate', 'advanced']
  },
  scholarshipAvalable: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  bootcamp: {
    type: mongoose.Schema.ObjectId,
    ref: 'Bootcamp',
    required: true
  }
})

module.exports = mongoose.model('Course', CourseSchema)