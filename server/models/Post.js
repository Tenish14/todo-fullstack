const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Postschema = new Schema({
    title: {
        type: String,
        require: true
    },
    body: {
        type: String,
        require: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User" 
    }
})

module.exports = mongoose.model("Post", Postschema)