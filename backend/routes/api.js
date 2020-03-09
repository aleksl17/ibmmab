var express = require('express');
var router = express.Router();

var anData = require('../models/AnalysisData')

/* Get API. */
router.get('/anData', (req, res) => {
    var query = req.query
    anData.find(query)
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

module.exports = router;