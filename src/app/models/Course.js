const mongoose = require('mongoose')
var slug = require('mongoose-slug-generator')
const mongooseDelete = require('mongoose-delete')

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

mongoose.plugin(slug)
Course.plugin(mongooseDelete, { overrideMethods: 'all', deletedAt: true })
module.exports = mongoose.model('Course', Course)
