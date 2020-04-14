const DiscoveryV1 = require('ibm-watson/discovery/v1');
const { IamAuthenticator} = require('ibm-watson/auth');

const anData = require('../models/AnalysisData');
const dotEnvSetup = require('../setups/dotEnvSetup');

/*
const addDocumentParams = {
    environmentId: process.env.WATSON_ENVIRONMENT_ID,
    collectionId: process.env.WATSON_COLLECTION_ID,
    file: Buffer.from(JSON.stringify(anData.findOne())),
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

const discovery = new DiscoveryV1({
    version: '2019-04-30',
    authenticator: new IamAuthenticator({
        apikey: process.env.WATSON_API_KEY,
    }),
    url: process.env.WATSON_URL,
});

//Watson Discovery Setup
async function run(){
    const documents = await anData.find();
    for(let idx in documents){
        let doc = documents[idx];
        await processFile(doc);
    }
}

async function processFile(doc){
    const addDocumentParams = {
        environmentId: process.env.WATSON_ENVIRONMENT_ID,
        collectionId: process.env.WATSON_COLLECTION_ID,
        file: Buffer.from(JSON.stringify(doc.toJSON())),
        fileContentType: 'application/json',
    };
    const response = await discovery.addDocument(addDocumentParams);
    if(!response){
        console.log('error');
        return
    }
    let documentAccepted = response.result;
    console.log(JSON.stringify(documentAccepted, null, 2));
}

module.exports = {
    run:run,
    processFile:processFile
};