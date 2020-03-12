var express = require('express');
var router = express.Router();

var AnalysisData = require('../models/AnalysisData');

/* Get API. */
router.get('/anData', (req, res) => {
    var query = req.query
    AnalysisData.find(query)
        .then(anDatas => {
            res.json({
                confirmation: 'success',
                data: anDatas
            })
        })
        .catch(err => {
            res.json({
                confirmation: 'fail',
                message: err.message
            })
        })
});

/* Set via html API. */
router.post('/anData', (req, res) => {
    AnalysisData.create(req.body)
        .then(anData => {
            res.json({
                confirmation: 'success',
                data: anData
            })
        })
        .catch(err => {
            res.json({
                confirmation: 'fail',
                message: err.message
            })
        })
});

/* Set via URL API */
router.get('/anData/add', (req, res) => {
    var query = req.query
    AnalysisData.create(query)
        .then(anData => {
            res.json({
                confirmation: 'success',
                data: anData
            })
        })
        .catch(err => {
            res.json({
                confirmation: 'fail',
                message: err.message
            })
        })
});

module.exports = router;