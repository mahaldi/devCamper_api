const fs = require('fs')
const mongoose = require('mongoose')
const colors = require('colors')
const env = require('dotenv')

env.config({ path: './config/config.env' })

const bootcamp = require('./models/Bootcamp')
const course = require('./models/Course')

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8'))
const courses = JSON.parse(fs.readFileSync(`${__dirname}/_data/courses.json`, 'utf-8'))

const importData = async () => {
  try {
    await bootcamp.create(bootcamps)
    await course.create(courses)
    console.log('imported'.green.inverse)
    process.exit();
  } catch (error) {
    console.log('error', error)
  }
}

const deleteData = async () => {
  try {
    await bootcamp.deleteMany()
    await course.deleteMany()
    console.log('deleted'.red.inverse)

    process.exit();
  } catch (error) {
    console.log('error', error)
  }
}

if(process.argv[2] === '-i') importData()
else if(process.argv[2] === '-d') deleteData()