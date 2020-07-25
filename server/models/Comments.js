const mongoose = require('mongoose')

const CommentsSchema = new mongoose.Schema({
    logid:{
        type:String,
        required:true
      },
    content: {
        type: String,
        required: true
      }
})

const Comments  = mongoose.model('Comments',CommentsSchema)

module.exports = Comments;