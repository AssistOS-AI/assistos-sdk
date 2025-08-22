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
async function getComponent(spaceId, appName, componentName){
    const client = await this.getClient(constants.CODE_MANAGER_PLUGIN, spaceId);
    return await client.getComponent(appName, componentName);
}
async function saveComponent(spaceId, appName, componentName, html, css, js, newName) {
    const client = await this.getClient(constants.CODE_MANAGER_PLUGIN, spaceId);
    return await client.saveComponent(appName, componentName, html, css, js, newName);
}

async function listComponents(spaceId){
    const client = await this.getClient(constants.CODE_MANAGER_PLUGIN, spaceId);
    return await client.listComponents();
}
async function listComponentsForApp(spaceId, appName){
    const client = await this.getClient(constants.CODE_MANAGER_PLUGIN, spaceId);
    return await client.listComponentsForApp(appName);
}
async function listBackendPluginsForApp(spaceId, appName){
    const client = await this.getClient(constants.CODE_MANAGER_PLUGIN, spaceId);
    return await client.listBackendPluginsForApp(appName);
}
async function getAppPersistoConfig(spaceId, appName){
    const client = await this.getClient(constants.CODE_MANAGER_PLUGIN, spaceId);
    return await client.getAppPersistoConfig(appName);
}
module.exports = {
    getClient,
    getCode,
    saveCode,
    saveComponent,
    listComponents,
    createApp,
    getApps,
    listComponentsForApp,
    listBackendPluginsForApp,
    getAppPersistoConfig,
    getComponent
}
