var mongoose = require('mongoose');

var AnalysisDataSchema = new mongoose.Schema({
    text: {type: String, trim: true, default: ''},
    title: {type: String, trim: true, default: ''},
    author: {type: String, trim: true, default: ''},
    url: {type: String, trim: true, default: ''},
    scrape_date: {type: Date, default: Date.now},
    score: {type: String, default: ''},
    sentiment: {type: String, default: '0'}
});

AnalysisDataSchema.set('toJSON', {getters: true, virtuals: false});

module.exports = mongoose.model('AnalysisData', AnalysisDataSchema);