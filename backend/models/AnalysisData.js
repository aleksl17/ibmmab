const mongoose = require('mongoose');
const { processFile } = require('../setups/discoverySetup');
const { interval } = require('rxjs');
const { map } = require('rxjs/operators');
const { mergeMap } = require('rxjs/operators');
//const lastDateJson = require('./lastDate.json');
const fs = require('fs');

const AnalysisDataSchema = new mongoose.Schema({
    text: {type: String, trim: true, default: ''},
    title: {type: String, trim: true, default: ''},
    author: {type: String, trim: true, default: ''},
    url: {type: String, trim: true, default: ''},
    scrape_date: {type: Date, default: Date.now},
    publish_date: {type: Date, default: Date.now},
}, {
    timestamps: true
});

AnalysisDataSchema.set('toJSON', {getters: true, virtuals: false});

async function connect(){
    const mongooseConnect = await mongoose.connect('mongodb://localhost/ibmmab', {useUnifiedTopology: true, useNewUrlParser: true});
    return mongooseConnect.model('AnalysisData', AnalysisDataSchema);
}

/*
async function jsonReader(filePath, cb) {
    fs.readFile(filePath, (err, fileData) => {
        if (err) {
            return cb && cb(err)
        }
        try {
            const object = JSON.parse(fileData);
            return cb && cb(null, object)
        } catch (err) {
            return cb && cb(err)
        }
    })
}

jsonReader('./lastDate.json', (err, date) => {
    if (err) {
        console.log(err);
        return
    }
    console.log(date.lastDate);
});

fs.writeFile('./lastDate.json', jsonString, err => {
    if (err) {
        console.log('Error writing to file', err);
    } else {
        console.log('Successfully wrote to fle');
    }
});
*/

async function run(){
    let lastDate = new Date(2010);
    const analysisData = await connect();
    const listener = interval(1000)
        .pipe(mergeMap(x =>{
            return analysisData.find().where('createdAt').gt(lastDate);
        }))
        .pipe(map(x =>{
            if(x.length > 0){
                lastDate = x.slice(-1).pop().createdAt;
            }
            return x
        }))
        .subscribe(x =>{
            x.forEach(doc =>{
                processFile(doc);
            })
        });
    const db = mongoose.connection;
    console.log(analysisData);
    /*
    analysisData.watch().on('change', data => {
        processFile(data);
    })
     */
}

module.exports = {
    run:run,
    connect:connect
};