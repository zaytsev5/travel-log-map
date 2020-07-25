const mongoose = require('mongoose')

const ImagesSchema = new mongoose.Schema({
    logid:{
        type:String,
        required:true
      },
    path: {
        type: String,
        required: true
      }
})

const Images  = mongoose.model('Images',ImagesSchema)

module.exports = Images;