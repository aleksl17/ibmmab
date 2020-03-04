var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ibmmab', {useUnifiedTopology: true, useNewUrlParser: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.on('connected', console.log.bind(console, 'DB Connected!'));
db.once('open', function() {
  // we're connected!
});

/*
var kittySchema = new mongoose.Schema({
  name: String
});
*/

var scraperSchema = new mongoose.Schema({
  keyword: String,
  url: String,
  author: String

});

var analysisSchema = new mongoose.Schema({
  title: String,

  url: String,
  author: String

});

// NOTE: methods must be added to the schema before compiling it with mongoose.model()
kittySchema.methods.speak = function () {
  var greeting = this.name
      ? "Meow name is " + this.name
      : "I don't have a name";
  console.log(greeting);
}

var Kitten = mongoose.model('Kitten', kittySchema);

var silence = new Kitten({ name: 'Silence' });
console.log(silence.name); // 'Silence'

var fluffy = new Kitten({ name: 'fluffy' });
fluffy.speak(); // "Meow name is fluffy"

fluffy.save(function (err, fluffy) {
  if (err) return console.error(err);
  fluffy.speak();
});

Kitten.find(function (err, kittens) {
  if (err) return console.error(err);
  console.log(kittens);
})

//Kitten.find({ name: /^fluff/ }, callback);













/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
