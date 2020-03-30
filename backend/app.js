var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var dotenv = require('dotenv');
var mongoose = require('mongoose');
var anData = require('./models/AnalysisData');
var fs = require('fs');
var DiscoveryV1 = require('ibm-watson/discovery/v1');
var { IamAuthenticator} = require('ibm-watson/auth');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiRouter = require('./routes/api');

var app = express();

//.env setup
var dotEnvResult = dotenv.config();
if (dotEnvResult.error) {
  throw dotEnvResult.error
}
//console.log(dotEnvResult.parsed);

//Mongoose database setup
mongoose.connect('mongodb://localhost/ibmmab', {useUnifiedTopology: true, useNewUrlParser: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.on('connected', console.log.bind(console, 'DB Connected!'));
db.once('open', function() {
  // we're connected!
});

//Watson Discovery setup
var discovery = new DiscoveryV1({
  version: '2019-04-30',
  authenticator: new IamAuthenticator({
    apikey: process.env.WATSON_API_KEY,
  }),
  url: process.env.WATSON_URL,
});

/*
var addDocumentParams = {
  environmentId: process.env.WATSON_ENVIRONMENT_ID,
  collectionId: process.env.WATSON_COLLECTION_ID,
  file: fs.createReadStream('./test-doc1.html'),
};

discovery.addDocument(addDocumentParams)
    .then(response => {
      var documentAccepted = response.result;
      console.log(JSON.stringify(documentAccepted, null, 2));
    })
    .catch(err => {
      console.log('error:', err);
    });
*/

/*
//Will be moved to AnalysisData.js if needed.
AnalysisDataSchema.methods.speak = function () {
  var textOutput = this.title
      ? "Title: " + this.title
      : "No Text Found";
  console.log(textOutput);
}
*/

//COMMENT OUT [FROM HERE] OR A NEW ENTRY WILL BE MADE AT EVERY LAUNCH

var exData0 = new anData( {
  //text: 'Polartorsken er viktig for både fugl, fisk og pattedyr. Mindre sjøis og varmere vann kan gi arten skikkelige utfordringer. – Dette er den viktigste arten i den artkiske næringskjeden. Det forteller forsker Mats Huserbråten ved Havforskningsinstituttet. Han har vært med på en studie hvor de har sett på polartorsken. En nøkkelart i økosystemet i Barentshavet. Den gyter under havisen, og lever på en diett av dyreplankton. Den er selv mat til minst 30 forskjellige arter i Barentshavet, ifølge Huserbråten. Han forklarer at prognoser viser at Barentshavet vil bli varmere og tilnærmet isfritt innen 2030. Dårlig nytt for flere arter. – Opptil ti prosent av dietten til skreien består av polartorsk. Mange pattedyr er i ulik grad avhengig av den som føde. Som narhval, vågehval, knølhval og hvithval. Samt blåkveite, hyse og en del fuglarter. Lengre nord enn før Forskerne har blant annet sett på hvor polartorsken gyter, og hvordan bestanden har endret seg. De har også forsøkt å sette rekruttering til bestanden, opp mot et endret klima. – Det har vært antatt at hoveddelen av bestanden gyter i et område sørøst i Barentshavet. Studien bekreftet dette, men viste også gyteaktivitet ved Svalbard. Det interessante med Svalbard, er at gytefeltet lå 50 mil lengre sørøst på 90-tallet. Én av grunnene til at dette har flyttet seg nordover, kan være varmere hav, sier forskeren. Lav rekruttering Også når man på dette området i Barentshavet, hvor mye av bestanden gyter, tegner det seg et interessant bilde: – Høyere temperatur og lite sjø is gir lav rekruttering. I 1995 var det ikke noe is i dette området. Da var det også veldig dårlig rekruttering. At polartorsken sliter med å reprodusere seg selv på grunn av nedgang i isdekke om vinteren, pekes på som dårlig nytt. Uten at man helt vet konsekvensene. Havforskninga skriver også at færre larver når voksen alder på grunn av varmere vann om sommeren. – Vi vet at havet her vil bli varmere i fremtiden. Bestanden kan bli marginalisert i Barentshavet. Mulig vil hele bestanden kollapse. Eller trekke seg østover, langs den russiske kontinetnalsokkelen. Blir endring Bestanden er størst rundt Barentshavet, som historisk sett har hatt den største gytebiomassen, forklarer forskeren. Nøyaktig hvor stor bestanden er, vet man ikke så mye om. Dette er nemlig en sjenert art. Den finnes dog trolig i store deler av Polhavet. Det som er sannsynlig, er uansett at man kan vente seg endring i Arktis på den ene eller andre måten. – Det kan ha en effekt på lofotfiske. Skreien kan komme til å måtte spise andre arter polartorsk, som er en feit og fin art for skreien. Vi vet ikke sikkert, men det vil bli endring. Hele den arktiske næringskjeden kan komme til å flytte på seg. En artikkel hos ScienceNews i februar påpekte hvordan støy fra økende skipstrafikk kan være en annen utfordring for fisken. Studien ble for ikke lenge siden trukket fram av av instituttet selv som «Årets publikasjon». Den kan leses her.',
  text: 'Polartorsken',
  title: 'Fisken pekes på som den viktigste i Arktis – mindre sjøis kan føre til at den kollapser',
  author: 'Markus Thonhaugen',
  url: 'https://www.nrk.no/nordland/polartorsken-er-den-viktigste-arten-i-arktis-og-na-sliter-den-som-folge-av-klimaendringer-1.14928729',
  scrape_date: '2020-03-06',
  score: 10,
  sentiment: 0
});
var exData1 = new anData( {
  //text: 'Initiativtakar til den mykje omtalte gruppa, «Folkeopprøret mot klimahysteri», Knut Amundsen, seier til NRK i kveld at det som har skjedd ikkje er dramatisk. Dei har bytta ut nokre administratorar som ifølgje han ville køyre sitt eige løp. Han meiner også at dei som no er kasta ut, har prøvd å favorisere Framstegspartiet. – Dei ville lage ein nettbutikk, selje T-skjorter og pins og lage podkast. Det er ikkje det vi skal drive med. Og vi skal vere ein tverrpolitisk organisasjon, seier Amundsen. Han meiner at det er heilt naturleg at det oppstår usemje i ei gruppe med 169.000 medlemer. – Tek det med ro – Eg tek dette med knusande ro. Vi jobbar med å skape ein organisasjon. Vi skal drive folkeopplysning, halde demonstrasjonar, og dette kjem etter kvart. Det som har skjedd i dag får ingen konsekvens for Facebooksida vår. Vi held fram som før, seier han. Han vedgår likevel at han synest det er trist, spesielt at nokon har skulda han for å lurt unna pengar. Dette avviser han på det sterkaste. Alle pengane som er betalte inn av medlemene står urøyvde på konto, forsikrar han. Thomas Rolén er ein av dei som i dag vart kasta som administrator for Facebooksida. Han trur ikkje lenger det er mogleg med ei forsoning med Knut Amundsen, og at dei no vil satse på å vidareutvikle den alternative Facebooksida FMKH. Usemje om Frp Han er sjølv medlem i Framstegspartiet. Han trur ei årsak til splittinga er at Carl I. Hagen gjekk inn og støtta gruppa, og at Amundsen har vore redd for gruppa skulle utvikle seg til å bli ein støttespelar for Frp. – Vi har heile tida stått på at dette skal vere ei gruppe for heile det politiske spekteret. Det er slett ikkje sant at vi har favorisert Framstegspartiet, seier Rolén. Han fortel at han har drive eige firma i 20 år, og at han kan dette med administrasjon. Han seier at fleire har vore misnøgde med måten Amundsen har drive på, men at dei ikkje har nådd fram med kritikken. – No satsar på vi på å vidareutvikle den nye Facebooksida. Og vi skal drive det som ein organisasjon og ikkje som ei privat greie, seier han. Han lovar at dei skal vere heilt opne overfor medlemene om det som skjer. Avviser menneskeskapte klimaendringar Thomas Rolén lovar at dei vil ha fullt fokus på saka, at folk må vakne opp og forstå det dei meiner er realitetane i klimadebatten. Begge dei to fraksjonane er heilt klare på at dei avviser klimaendringane som menneskeskapte, og dei meiner at politikarar og forskarar held folk for narr når dei gir menneskeleg aktivitet skulda for klimaendringane. Dette trass i at eit overveldande fleirtal klimaforskarar er samde om at menneskeleg aktivitet bidreg til klimaendringane. Då Amundsen starta opp Facebooksida tidlegare i år førde det til etableringa av fleire motsider, blant andre «Folkeopprøret mot folkeopprøret mot klimahysteri».',
  text: 'Opprør',
  title: 'Opprør i «Folkeopprøret mot klimahysteri»',
  author: 'Bent Tandstad',
  url: 'https://www.nrk.no/norge/oppror-i-_folkeopproret-mot-klimahysteri_-1.14932424',
  scrape_date: '2020-03-09',
  score: 5,
  sentiment: 1
});

exData0.save(function (err, exData0) {
  if (err) return console.error(err);
  //exData0.speak();
});
exData1.save(function (err, exData1) {
  if (err) return console.error(err);
  //exData1.speak();
});

//[TO HERE]

//Outputs DB entries in console.
/*
anData.find(function (err, anDatas) {
  if (err) return console.error(err);
  console.log(anDatas);
})
*/
//Rich query example
//anData.find({ name: /^Polar/ }, callback);





























// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//CORS Policy Fix
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', apiRouter);

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
