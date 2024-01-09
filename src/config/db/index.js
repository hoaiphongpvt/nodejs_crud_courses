const mongoose = require('mongoose')

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/courses_db')
        console.log('Connect Successfuly')
    } catch (error) {
        console.log('Connect fail' + error)
    }
}

module.exports = { connect }
