const mongoose = require('mongoose')
var slug = require('mongoose-slug-generator')
mongoose.plugin(slug)
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const Course = new Schema(
    {
        id: ObjectId,
        name: { type: String },
        desc: { type: String },
        thumbnail: { type: String },
        slug: { type: String, slug: 'name' },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Course', Course)
