const express = require('express'),
router = express.Router(),
bodyParser = require('body-parser'),
User = require('../models/user'),
cookieParser = require('cookie-parser'),
bcrypt = require("bcryptjs"),
saltRounds = 10
// Recaptcha = require('express-recaptcha').Recaptcha;

var user = {
  username: undefined,
  registered: 'none'
}

router.get('/login', function (req, res, next) {
  res.render('login', {
    registered: user.registered
  });
  user.registered = 'none'
});

router.post('/login', function (req, res, next) {
  console.log(req.body.username)
  console.log(req.body.password)
  User.find({
    username: req.body.username
  }, (err, result) => {
    if (err) {
      console.log('error:', err)
    }else if (result[0] && bcrypt.compareSync(req.body.password, result[0].password)) {
      res.cookie('user', result[0])
      console.log(result[0].username + ' just logged in!')
      res.redirect('/') //how do I make this a promise? should I?
    }else{
      res.send('there was a problem, please try again!')
    }
  })
})

router.get('/register', function (req, res, next) {
  res.render('register');
});


router.post('/register', (req, res, next) => {

  User.find({username: req.body.username},(err,result)=>{
    console.log(result[0])
    if(result[0]){
      res.render('register', {usernameError: 'this Username is already taken!'})
    }else if(req.body.username.length < 5){ //can I make this a promise instead of putting everything in the .find?
      res.render('register', {usernameError: 'username has to be longer than 5 characters'})
    }else if(/\d/.test(req.body.password) == false || req.body.password.length < 6){
      res.render('register', {passwordError: 'password should have more than 6 characters and should include a number.'})
    }else if (req.body.password == req.body.passwordVerify) {

    const salt     = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      dateofBirth: req.body.birthdate,
      password: hashPass
    })
    newUser.save((err) => {
      if (err) {
        console.log(err)
      } else {
        console.log('new User registered')
      }
    });
    console.log('redirecting to login')
    user.registered = 'block'
    res.redirect('/login')
  } else {
    res.send('there was a problem, please try again')
  }

    })

})


router.get('/logout', function (req, res, next) {
  res.clearCookie("user")
  console.log(req.cookies)
  res.redirect('/');
  
});



module.exports = router;
