const DiscoveryV1 = require('ibm-watson/discovery/v1');
const { IamAuthenticator} = require('ibm-watson/auth');

const anData = require('../models/AnalysisData');
const dotEnvSetup = require('../setups/dotEnvSetup');

//Watson Discovery Setup
const discovery = new DiscoveryV1({
    version: '2019-04-30',
    authenticator: new IamAuthenticator({
        apikey: process.env.WATSON_API_KEY,
    }),
    url: process.env.WATSON_URL,
});

/*
const addDocumentParams = {
    environmentId: process.env.WATSON_ENVIRONMENT_ID,
    collectionId: process.env.WATSON_COLLECTION_ID,
    file: Buffer.from(anData.find().toString()),
};

discovery.addDocument(addDocumentParams)
    .then(response => {
        let documentAccepted = response.result;
        console.log(JSON.stringify(documentAccepted, null, 2));
    })
    .catch(err => {
        console.log('error:', err);
    });
*/

module.exports = discovery;