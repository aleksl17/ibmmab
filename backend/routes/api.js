var express = require('express');
var router = express.Router();

var AnalysisData = require('../models/AnalysisData');



//NOTE TO SELF, add support for partial search via e.g. $regex.



/* Get API. */
router.get('/anData', async (req, res) => {
    var query = req.query;
    const analysisData = await AnalysisData.connect();
    analysisData.find(query)
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
router.post('/anData', async (req, res) => {
    const analysisData = await AnalysisData.connect();
        analysisData.create(req.body)
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
router.get('/anData/add', async (req, res) => {
    var query = req.query;
    const analysisData = await AnalysisData.connect();
    analysisData.create(query)
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