var passport = require('passport'),
FacebookStrategy = require('passport-facebook').Strategy
require('dotenv').config();
var {Person, Post,User} = require('../models/Combine')

passport.serializeUser(function(user, done){
    done(null, user);
  })
  
  passport.deserializeUser(function(user, done){
    done(null, user);
  })
  
  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL,
    profileFields: ['id', 'displayName','photos', 'email','birthday','gender'],
    enableProof: true
  },
  function(accessToken, refreshToken, profile, done) {
   // console.log(profile);
    // console.log(accessToken);
  
    User.findOneAndUpdate({ id: profile._json.id },{ image: profile._json.picture.data.url },{
      new: true
    })
      .then(async user => {
        if (user) {
        //  User.findOneAndUpdate({ id: profile._json.id }, { image: profile._json.picture.data.url }, function (error, result) {
         //   if (error) return;
            console.log("User logged in ");
  
            return done(null, profile);
            //     // do something with the document
         // });
        } else {
          console.log("Not logged yet");
          //adding user to mongodb 
          const newUser = new User({
            id: profile._json.id,
            name: profile._json.name,
            email: profile._json.email,
            password: Math.random().toString(16).substring(8),
            image: profile._json.picture.data.url
          })
          newUser.save()
            .then(res => done(null, profile))
        }
  
      })
      
  
  }
  ));

  module.exports = passport