var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/people-demo');
var peopleCollection = db.get('people');

router.get('/people', function(req, res, next) {
  peopleCollection.find({}, function (err, peopleIndex) {
    res.render('people/index', {allPeople: peopleIndex});
  });
});

router.get('/people/new', function(req, res, next) {
  res.render('people/new');
});

router.post('/people/new', function(req, res, next){
  var errorArray = [];
  if (req.body.person_name === "" || req.body.person_name === null){
    errorArray.push('Name must not be blank');
  }

  if (req.body.person_hobby === "" || req.body.person_hobby === null){
    errorArray.push('Hobby must not be blank');
  }


  if (errorArray.length > 0 ){
      res.render('people/new', { errorList: errorArray });
  }

  else {
    peopleCollection.insert({
    name: req.body.person_name,
    hobby: req.body.person_hobby
    });
  res.redirect('/people');
  }
});



module.exports = router;
