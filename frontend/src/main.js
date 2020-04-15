import Vue from 'vue'
import App from './App.vue'
import router from './router'



Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');


/*
const dotEnv = require('dotenv');
const DiscoveryV1 = require('ibm-watson/discovery/v1');
const { IamAuthenticator } = require('ibm-watson/auth');
const dotEnvResult = dotEnv.config();

if(dotEnvResult.error){
  throw dotEnvResult.error
}

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
};

discovery.query(queryParams)
    .then(queryResponse => {
      console.log(JSON.stringify(queryResponse, null, 2));
    })
    .catch(err => {
      console.log('error:', err);
    })*/
