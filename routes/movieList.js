const express = require('express'),
router = express.Router()
// cookieParser = require('cookie-parser')
const axios = require('axios');


/* GET users listing. */
router.get('/movies', function(req, res, next) {
  if(req.cookies.user !== undefined){
    res.render('movieList')
  

  router.post('/movies', (req,res,next)=>{
    // req.body.search

    var title = req.body.search
    axios.get(`http://www.omdbapi.com/?apikey=add288c5&t=${title}`)
    .then(function (response) {
      // handle success
      console.log('######################',response.data.Title);

      res.render('movieList',{info: response.data})

    })
    .catch(function (error) {
      console.log('######################',error);
    })

  })
  
    
  
  
    
    

    // .then(response=>{
    //   title = response.title
    //   console.log('##########',response.title)
    // })
    // res.render('movieList',{title:'title'});
  }else{
    res.redirect('/login')
  }
  
});



module.exports = router;
