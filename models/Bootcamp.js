const mongoose = require('mongoose')

const BootcampSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, 'please add name'],
    unique: true,
    trim: true,
    maxLength: [50, 'max 50 char']
  },
  slug: String,
  description: {
    type: String,
    require: [true, 'please add desc'],
    maxLength: [500, 'max 500 char']
  },
  website: {
    type: String,
    required: [true, 'please add website']
  },
  email: {
    type: String,
    required: [true, 'please add email']
  },
  phone: {
    type: String,
    required: [true, 'please add phone']
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: false
    },
    coordinates: {
      type: [Number],
      required: false,
      index: '2dsphere'
    },
    formattedAddress: String,
    street: String,
    city: String,
    zipcode: String,
    country: String,
  },
  careers: {
    type: [String],
    required: true,
    enum: [
      'UI/UX',
      'Web Development',
      'Business',
      'Other'
    ]
  },
  averageRating: {
    type: Number,
    min: [1, 'min 1'],
    max: [10, 'max 10']
  },
  averageCost: Number,
  photo: {
    type: String,
    default: 'no-photo.jpg'
  },
  housing: {
    type: Boolean,
    default: false
  },
  jobAssistance: {
    type: Boolean,
    default: false
  },
  jobGuarantee: {
    type: Boolean,
    default: false
  },
  acceptGi: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('Bootcamp', BootcampSchema);