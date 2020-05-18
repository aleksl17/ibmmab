const mongoose = require('mongoose');
const moment = require('moment');
const { processFile } = require('../setups/discoverySetup');
const { interval } = require('rxjs');
const { map } = require('rxjs/operators');
const { mergeMap } = require('rxjs/operators');
const fs = require('fs');

const AnalysisDataSchema = new mongoose.Schema({
    text: {type: String, trim: true, default: ''},
    title: {type: String, trim: true, default: ''},
    author: {type: String, trim: true, default: ''},
    url: {type: String, trim: true, default: ''},
    scrape_date: {type: Date, default: Date.now},
    publish_date: {type: Date, default: Date.now},
    createdAt: {type: String, default: moment().utc().format('YYYYMMDDhhmmss')}
});

AnalysisDataSchema.set('toJSON', {getters: true, virtuals: false});

async function connect(){
    AnalysisDataSchema.index( { "$**": "search" } );
    const mongooseConnect = await mongoose.connect('mongodb://localhost/ibmmab', {useUnifiedTopology: true, useNewUrlParser: true});
    return mongooseConnect.model('AnalysisData', AnalysisDataSchema);
}

async function run(){
    let lastDate = fs.readFileSync('lastDate.json').toString();
    const analysisData = await connect();
    const listener = interval(1000)
        .pipe(mergeMap(x =>{
            return analysisData.find().where('createdAt').gt(lastDate);
        }))
        .pipe(map(x =>{
            if(x.length > 0){
                lastDate = x.slice(-1).pop().createdAt;
                fs.writeFileSync('lastDate.json', moment().utc().format('YYYYMMDDhhmmss'));
            }
            return x
        }))
        .subscribe(x =>{
            x.forEach(doc =>{
                processFile(doc);
            })
        });
}

module.exports = {
    run:run,
    connect:connect
};
