const mongoose = require('mongoose');

const LogSchema = new mongoose.Schema({
  id:{
    type:String,
    required:true
  },
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  comments: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  visitDate:{
      type:Date,
      required:true
  },image: {
    type: String,
    required: true
  },

});

const Log = mongoose.model('Log', LogSchema);

module.exports = Log;
