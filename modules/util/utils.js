const constants = require("../../constants");

async function getAPIClient(userId, pluginName, serverlessId, options = {}) {
    if (!serverlessId) {
        serverlessId = constants.GLOBAL_SERVERLESS_ID;
    }

    if (typeof serverlessId === "object") {
        options = serverlessId;
        serverlessId = constants.GLOBAL_SERVERLESS_ID;
    }
    const serverless = require("./serverless/serverless-client");
    // Handle both direct exports and default export wrapper
    const serverlessModule = serverless.default || serverless;
    const baseURL = serverlessModule.getBaseURL();
    return await serverlessModule.createServerlessAPIClient(userId, baseURL, serverlessId, pluginName, "", options);
}
module.exports = {
    getAPIClient
}