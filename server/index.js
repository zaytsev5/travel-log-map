
var express = require('express');
var app = express()
var multer = require('multer');
var path = require('path')
var FB = require('fb')
var mongoose = require('mongoose')
//var User = require('./models/Users')
var Log = require('./models/Log')
var { Person, Post, User } = require('./models/Combine')
var session = require('express-session')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var passport = require('./config/passport')

const expires = 60 * 1000
const limit = 5;

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('view engine', 'ejs')
app.use('/image', express.static('uploads'))
app.use(require('cors')({
  origin: ["http://localhost:9000", "http://localhost:3001"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true // allow session cookie from browser to pass through
}))
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    cookie: {
      // expires : expires
    }

  })
);
// Setup passport 


app.use(passport.initialize());
app.use(passport.session());


const db = require('./config/key').mongoURI;


mongoose
  .connect(
    db,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    },

  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname)
  }
})

var upload = multer({ storage: storage })

const fowardAuthicated = (req, res, next) => {
  if (req.user) next()
  else res.status(401).json({
    authenticated: false,
    message: "user has not been authenticated"
  });
}

app.get('/get/comments', async (req, res) => {
  const index = req.query.index
  const action = req.query.action

  const comments = await Post.find().skip(parseInt(index) > 0 ? parseInt(index) - 5 : 0).limit(limit)
  res.json(comments)

  // console.log(index);
  // res.send({index,action})
})

app.get('/me', fowardAuthicated, (req, res) => {
  user = []
  user.push(req.user._json)
  res.json(user)
  //console.log(req.user);
})

app.get('/login/success', (req, res) => {
  res.send("Logged in successfully...")
})

app.get("/auth/login/success", fowardAuthicated, (req, res) => {

  if (req.user) {
    //console.log(req.user);
    res.json({
      success: true,
      expired: new Date().getTime() + expires,
      message: "user has successfully authenticated",
      user: req.user,
    });
  }
});

app.get('/user', (req, res) => {
  console.log(req.user.id);
  User.findOne({ id: req.user.id }, (err, user) => {
    if (err) return res.send("error");

    console.log(user);
    FB.setAccessToken(user.accessToken);
    FB.api('/me/accounts', (pages) => {
      console.log(pages);
    });
  });
})

app.get('/logout', (req, res) => {
  req.logout()
  res.redirect('http://localhost:9000')

});


app.get('/auth/facebook',
  passport.authenticate('facebook', { scope: ['email'] })
);


app.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/login/success',
    failureRedirect: "/auth/login/failed"
  })

);

app.get("/auth/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "user failed to authenticate."
  });
});

app.get('/log/:id', (req, res) => {
  Log.find({ id: req.params.id })
    //.then(posts => res.json(posts) )
    .populate('uid')
    .exec(async (err, post) => {
      if (err) return console.log(err);
      //  console.log(post);
      res.status(200).json(post)
    })
  // const filter = await  Post.find().then(posts => posts.filter(post => post.user == '5f0c8313f199812daddd0d8a') )
})

app.get('/api/:log/cmts/:limit', (req, res) => {
  Post.find({ lid: req.params.log })
    // .limit(5)
    //.then(posts => res.json(posts) )
    .limit(parseInt(req.params.limit))
    .populate('uid')
    .exec(async (err, post) => {
      if (err) return console.log(err);
      res.json(post)
    })
  // const filter = await  Post.find().then(posts => posts.filter(post => post.user == '5f0c8313f199812daddd0d8a') )
})

app.get('/test', async (req, res) => {

  try {
    const user1 = await Person.findOne({ name: 'nguyen' })
    try {
      const post = await Post.create({
        title: 'this is title',
        body: 'this is mine',
        user: user1._id
      })
      console.log(post);
    } catch (err) {

      console.log('saving post');
    }

  } catch (err) {
    console.log(err);
  }
})

app.get('/info/:id', (req, res) => {
  User.findOne({ id: req.params.id })
    .then(user => {
      if (user) return res.json(user)
      res.json([])
    })
})

app.post('/auto', async (req, res) => {
  const { lid, uid, title, body } = req.body;
  // console.log(req.body);
  const post = new Post({ lid, uid, title, body })
  post.save()
    .then(post => {
      if (post) return res.json({ done: true })
      else return res.json({ done: false })
    })


})

app.post('/addlogs', async (req, res) => {
  const { id, title, latitude, longitude, comments, author, visitDate, image } = req.body
  // console.log(req.body);
  const log = new Log({ id, title, latitude, longitude, comments, author, visitDate, image })
  log.save()
    .then(log => {
      if (log) return res.json({ done: true })
      else return res.json({ done: false })
    })
})

app.get('/get', async (req, res) => {
  Post.find({ lid: '1' })
    //.then(posts => res.json(posts) )
    .populate('uid')
    .exec(async (err, post) => {
      if (err) return console.log(err);
      res.json(post)
    })
})

app.get('/allusers', (req, res) => {
  User.find()
    .then(users => {
      res.json(users)
    })
})


app.get('/api/logs', (req, res) => {
  Log.find()
    .then(logs => {
      res.json(logs)
    })
})

app.get('/testjoin', (req, res) => {

  User.findOne({ name: 'nguyenvnhai' })
    .then(user => {
      Log.find({ id: user.uid })
        .then(log => {
          let join = {
            user,
            log
          }
          res.json(join)
        })
    })

})
/* GET create blog. */
app.get('/create', function (req, res, next) {
  res.render('create');
});

app.get('/comments/:lim', async (req, res) => {
  // console.log(typeof req.params.lim);
  const comments = await Post.find().skip(5).limit(parseInt(req.params.lim))
  res.json(comments)
})

/*single file upload*/
app.post('/upload', upload.single('blogimage'), function (req, res, next) {
  var fileinfo = req.file;
  var title = req.body.title;
  console.log(title);
  res.send(fileinfo);
})

/*multiple files upload*/
app.post('/uploads', upload.array('blogimage', 5), function (req, res, next) {
  var fileinfo = req.files;
  var arrFn = []
  fileinfo.map(fn => arrFn.push(fn.filename))
  var title = req.body.title;
  console.log(arrFn);
  res.send(fileinfo);
})

app.listen(3000, () => {
  console.log('Server started on port 3000')
  // console.log(process.env.DB_NAME);
})
