const mongoose = require('mongoose');


const PersonSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  }]

});


const PostSchema = new mongoose.Schema({
  lid:{
    type: String,
    required: true
  },
  uid: {
    type: mongoose.Schema.Types.ObjectId,
    ref :'User'
  },
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  }
  

});
const UserSchema = new mongoose.Schema({
 
  id:{
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email:{
    type:String,
    required:true,
  },
  password: {
    type: String,
    required: true
  },
  image:{
    type:String,
    required:true
  }

});

const User = mongoose.model('User', UserSchema);


const Person = mongoose.model('Person', PersonSchema);
const Post = mongoose.model('Post', PostSchema);
module.exports = {
  Person,
  Post,User
}

