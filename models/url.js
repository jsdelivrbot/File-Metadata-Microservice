const mongoose = require('mongoose')
const Schema = mongoose.Schema

const shortid = require('shortid')

// Create URL Schema
const urlSchema = new Schema({
    _id: {
        type: String,
        'default': shortid.generate
    },
    link:{
        type: String,
        required: [ true, 'link field is required' ]
    }

})

const URL = mongoose.model('url', urlSchema)

module.exports = URL