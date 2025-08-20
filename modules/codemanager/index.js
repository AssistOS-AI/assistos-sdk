const {getAPIClient} = require("../util/utils");
const constants = require("../../constants");

async function getClient(pluginName, spaceId) {
    return await getAPIClient(this.__securityContext.userId, pluginName, spaceId, {
        email: this.__securityContext.email
    })
}

const getCode = async function (spaceId, componentId) {
    const client = await this.getClient(constants.CODE_MANAGER_PLUGIN, spaceId);
    return await client.getCode(componentId);
}

const saveCode = async function (spaceId, folder, fileName, editorContent) {
    const client = await this.getClient(constants.CODE_MANAGER_PLUGIN, spaceId);
    return await client.saveCode(folder, fileName, editorContent);
}
const createApp = async function (spaceId, appName) {
    const client = await this.getClient(constants.CODE_MANAGER_PLUGIN, spaceId);
    return await client.createApp(appName);
}
async function getApps(spaceId){
    const client = await this.getClient(constants.CODE_MANAGER_PLUGIN, spaceId);
    return await client.getApps();
}
const saveWebskelComponent = async function (spaceId, fileName, componentData) {
    const client = await this.getClient(constants.CODE_MANAGER_PLUGIN, spaceId);
    return await client.saveWebskelComponent(fileName, componentData);
}

async function listComponents(spaceId, appName){
    const client = await this.getClient(constants.CODE_MANAGER_PLUGIN, spaceId);
    return await client.listComponents(appName);
}

module.exports = {
    getClient,
    getCode,
    saveCode,
    saveWebskelComponent,
    listComponents,
    createApp,
    getApps
}
