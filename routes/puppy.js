var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/valid-demo');
var puppyCollection = db.get('puppy');
var peopleCollection = db.get('person');


router.get('/puppy', function(req, res, next) {
  puppyCollection.find({}, function (err, pupIndex) {
    res.render('puppy/index', {allPuppies: pupIndex});
  });
});

router.get('/puppy/new', function(req, res, next) {
  res.render('puppy/new');
});

router.post('/puppy/new', function(req, res, next){
  var errorArray = [];
  if (req.body.pup_name === "" || req.body.pup_name === null){
    errorArray.push('Name must not be blank');
  }

  if (req.body.pup_id === "" || req.body.pup_id === null){
    errorArray.push('ID must not be blank');
  }

  if (req.body.pup_id.length <= 2){
    errorArray.push('ID must be at least 3 characters');
  }

  if (errorArray.length > 0 ){
      res.render('puppy/new', { errorList: errorArray });
  }

  else {
    puppyCollection.insert({
    name: req.body.pup_name,
    id: req.body.pup_id
    });
  res.redirect('/puppy');
  }
});

router.get('/puppy', function(req, res, next) {
  puppyCollection.find({}, function (err, peopleIndex) {
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

  if (req.body.person_id === "" || req.body.person_id === null){
    errorArray.push('ID must not be blank');
  }

  // if (req.body.people_id.length <= 2){
  //   errorArray.push('ID must be at least 3 characters');
  // }

  if (errorArray.length > 0 ){
      res.render('people/new', { errorList: errorArray });
  }

  else {
    peopleCollection.insert({
    name: req.body.person_name,
    id: req.body.person_id
    });
  res.redirect('/people');
  }
});



module.exports = router;
