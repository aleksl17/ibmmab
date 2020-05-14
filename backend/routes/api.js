const express = require('express');
const router = express.Router();
const AnalysisData = require('../models/AnalysisData');
//const discoverySetup = require('../setups/discoverySetup');
const DiscoveryV1 = require('ibm-watson/discovery/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

const discovery = new DiscoveryV1({
    version: '2019-04-30',
    authenticator: new IamAuthenticator({
        apikey: process.env.WATSON_API_KEY,
    }),
    url: process.env.WATSON_URL,
});

const queryParams = {
    environmentId: process.env.WATSON_ENVIRONMENT_ID,
    collectionId: process.env.WATSON_COLLECTION_ID,
    query: ""
};

/* Get API IBM database */
router.get('/ibmData', async (req, res) => {
    discovery.query(queryParams)
        .then(queryResponse => {
            res.json({
                confirmation: 'success',
                data: queryResponse
            })
        })
        .catch(err => {
            res.json({
                confirmation: 'fail',
                message: err.message
            })
        });
});




/* Get API local database. */
router.get('/anData', async (req, res) => {
    var query = req.query;
    const analysisData = await AnalysisData.connect();
    if(query.hasOwnProperty("search")){
        const result = await analysisData.aggregate([{
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