var express = require('express');
var router = express.Router();
var AnalysisData = require('../models/AnalysisData');



//NOTE TO SELF, add support for partial search via e.g. $regex.



/* Get API. */
router.get('/anData', async (req, res) => {
    var query = req.query;
    const analysisData = await AnalysisData.connect();
    if(query.hasOwnProperty("search")){
        const result = await AnalysisData.aggregate([{
            $match: {
                $or: [
                    {
                        text:
                        {
                            $regex: query.search,
                            '$options': "i"
                        }
                    },
                    {
                        author:
                            {
                                $regex: query.search,
                                '$options': "i"
                            }
                    },
                    {
                        title:
                            {
                                $regex: query.search,
                                '$options': "i"
                            }
                    },
                    {
                        url:
                            {
                                $regex: query.search,
                                '$options': "i"
                            }
                    },


                ]
            }
        }]);
        if(!result){
            res.json({
                confirmation: 'fail',
                message: result.message
            });
            return
        }
        res.json({
            confirmation: 'success',
            data: result
        });
        return
    }
    else{
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
    }

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