const dotenv = require('dotenv');

//.env setup
const dotEnvResult = dotenv.config();
if (dotEnvResult.error) {
    throw dotEnvResult.error
}
//console.log(dotEnvResult.parsed);

module.exports = dotEnvResult;