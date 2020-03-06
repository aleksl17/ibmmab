var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();


//Database setup
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

var ibmmabSchema = new mongoose.Schema({
  text: String,
  title: String,
  author: String,
  url: String,
  scrape_date: Date,
  score: Number,
  sentiment: Number
});

ibmmabSchema.methods.speak = function () {
  var textOutput = this.title
      ? "Title: " + this.title
      : "No Text Found";
  console.log(textOutput);
}

var anDat = mongoose.model('anDat', ibmmabSchema)

var exDat = new anDat({
  text: 'Polartorsken er viktig for både fugl, fisk og pattedyr. Mindre sjøis og varmere vann kan gi arten skikkelige utfordringer. – Dette er den viktigste arten i den artkiske næringskjeden. Det forteller forsker Mats Huserbråten ved Havforskningsinstituttet. Han har vært med på en studie hvor de har sett på polartorsken. En nøkkelart i økosystemet i Barentshavet. Den gyter under havisen, og lever på en diett av dyreplankton. Den er selv mat til minst 30 forskjellige arter i Barentshavet, ifølge Huserbråten. Han forklarer at prognoser viser at Barentshavet vil bli varmere og tilnærmet isfritt innen 2030. Dårlig nytt for flere arter. – Opptil ti prosent av dietten til skreien består av polartorsk. Mange pattedyr er i ulik grad avhengig av den som føde. Som narhval, vågehval, knølhval og hvithval. Samt blåkveite, hyse og en del fuglarter. Lengre nord enn før Forskerne har blant annet sett på hvor polartorsken gyter, og hvordan bestanden har endret seg. De har også forsøkt å sette rekruttering til bestanden, opp mot et endret klima. – Det har vært antatt at hoveddelen av bestanden gyter i et område sørøst i Barentshavet. Studien bekreftet dette, men viste også gyteaktivitet ved Svalbard. Det interessante med Svalbard, er at gytefeltet lå 50 mil lengre sørøst på 90-tallet. Én av grunnene til at dette har flyttet seg nordover, kan være varmere hav, sier forskeren. Lav rekruttering Også når man på dette området i Barentshavet, hvor mye av bestanden gyter, tegner det seg et interessant bilde: – Høyere temperatur og lite sjø is gir lav rekruttering. I 1995 var det ikke noe is i dette området. Da var det også veldig dårlig rekruttering. At polartorsken sliter med å reprodusere seg selv på grunn av nedgang i isdekke om vinteren, pekes på som dårlig nytt. Uten at man helt vet konsekvensene. Havforskninga skriver også at færre larver når voksen alder på grunn av varmere vann om sommeren. – Vi vet at havet her vil bli varmere i fremtiden. Bestanden kan bli marginalisert i Barentshavet. Mulig vil hele bestanden kollapse. Eller trekke seg østover, langs den russiske kontinetnalsokkelen. Blir endring Bestanden er størst rundt Barentshavet, som historisk sett har hatt den største gytebiomassen, forklarer forskeren. Nøyaktig hvor stor bestanden er, vet man ikke så mye om. Dette er nemlig en sjenert art. Den finnes dog trolig i store deler av Polhavet. Det som er sannsynlig, er uansett at man kan vente seg endring i Arktis på den ene eller andre måten. – Det kan ha en effekt på lofotfiske. Skreien kan komme til å måtte spise andre arter polartorsk, som er en feit og fin art for skreien. Vi vet ikke sikkert, men det vil bli endring. Hele den arktiske næringskjeden kan komme til å flytte på seg. En artikkel hos ScienceNews i februar påpekte hvordan støy fra økende skipstrafikk kan være en annen utfordring for fisken. Studien ble for ikke lenge siden trukket fram av av instituttet selv som «Årets publikasjon». Den kan leses her.',
  title: 'Fisken pekes på som den viktigste i Arktis – mindre sjøis kan føre til at den kollapser',
  author: 'Markus Thonhaugen',
  url: 'https://www.nrk.no/nordland/polartorsken-er-den-viktigste-arten-i-arktis-og-na-sliter-den-som-folge-av-klimaendringer-1.14928729',
  scrape_date: '2020-03-06',
  score: '0',
  sentiment: '0'
});
console.log(exDat.title);

exDat.save(function (err, exDat) {
  if (err) return console.error(err);
  exDat.speak();
});

anDat.find(function (err, anDatas) {
  if (err) return console.error(err);
  console.log(anDatas);
})



//anDat.find({ name: /^Polar/ }, callback);



/*
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
 */


































// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
