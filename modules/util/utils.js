const constants = require("../../constants");

async function getAPIClient(userId, pluginName, serverlessId, options = {}){
    if(!serverlessId){
        serverlessId = constants.GLOBAL_SERVERLESS_ID;
    }

    if(typeof serverlessId === "object"){
        options = serverlessId;
        serverlessId = constants.GLOBAL_SERVERLESS_ID;
    }
    const serverless = require("./serverless");
    const baseURL = serverless.getBaseURL();
    return await serverless.createServerlessAPIClient(userId, baseURL, serverlessId, pluginName, "", options);
}
module.exports = {
    getAPIClient
}