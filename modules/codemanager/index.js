const {getAPIClient} = require("../util/utils");
const constants = require("../../constants");

async function getClient(pluginName, spaceId) {
    return await getAPIClient(this.__securityContext.userId, pluginName, spaceId, {
        email: this.__securityContext.email
    })
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
async function deleteComponent(spaceId, appName, componentName){
    const client = await this.getClient(constants.CODE_MANAGER_PLUGIN, spaceId);
    return await client.deleteComponent(appName, componentName);
}
async function listBackendPluginsForApp(spaceId, appName){
    const client = await this.getClient(constants.CODE_MANAGER_PLUGIN, spaceId);
    return await client.listBackendPluginsForApp(appName);
}
async function getAppPersistoConfig(spaceId, appName){
    const client = await this.getClient(constants.CODE_MANAGER_PLUGIN, spaceId);
    return await client.getAppPersistoConfig(appName);
}
async function saveBackendPlugin(spaceId, appName, pluginName, content, newName){
    const client = await this.getClient(constants.CODE_MANAGER_PLUGIN, spaceId);
    return await client.saveBackendPlugin(appName, pluginName, content, newName);
}
async function getBackendPlugin(spaceId, appName, pluginName){
    const client = await this.getClient(constants.CODE_MANAGER_PLUGIN, spaceId);
    return await client.getBackendPlugin(appName, pluginName);
}
async function deleteBackendPlugin(spaceId, appName, pluginName){
    const client = await this.getClient(constants.CODE_MANAGER_PLUGIN, spaceId);
    return await client.getBackendPlugin(appName, pluginName);
}
async function deleteApp(spaceId, appName){
    const client = await this.getClient(constants.CODE_MANAGER_PLUGIN, spaceId);
    return await client.deleteApp(appName);
}
async function getAppRepoStatus(spaceId, appName){
    const client = await this.getClient(constants.CODE_MANAGER_PLUGIN, spaceId);
    return await client.getAppRepoStatus(appName);
}
async function commitAndPush(spaceId, appName, commitMessage){
    const client = await this.getClient(constants.CODE_MANAGER_PLUGIN, spaceId);
    return await client.commitAndPush(appName, commitMessage);
}
async function pullApp(spaceId, appName){
    const client = await this.getClient(constants.CODE_MANAGER_PLUGIN, spaceId);
    return await client.pullApp(appName);
}
async function listThemesForApp(spaceId, appName){
    const client = await this.getClient(constants.CODE_MANAGER_PLUGIN, spaceId);
    return await client.listThemesForApp(appName);
}
async function getTheme(spaceId, appName, themeName){
    const client = await this.getClient(constants.CODE_MANAGER_PLUGIN, spaceId);
    return await client.getTheme(appName, themeName);
}
async function saveTheme(spaceId, appName, themeName, content, newName){
    const client = await this.getClient(constants.CODE_MANAGER_PLUGIN, spaceId);
    return await client.saveTheme(appName, themeName, content, newName);
}
async function deleteTheme(spaceId, appName, themeName){
    const client = await this.getClient(constants.CODE_MANAGER_PLUGIN, spaceId);
    return await client.deleteTheme(appName, themeName);
}
async function updateAppManifest(spaceId, appName, data){
    const client = await this.getClient(constants.CODE_MANAGER_PLUGIN, spaceId);
    return await client.updateAppManifest(appName, data);
}
async function changeAppTheme(spaceId, appName, themeName){
    const client = await this.getClient(constants.CODE_MANAGER_PLUGIN, spaceId);
    return await client.changeAppTheme(appName, themeName);
}
module.exports = {
    getClient,
    saveComponent,
    listComponents,
    createApp,
    getApps,
    listComponentsForApp,
    listBackendPluginsForApp,
    getAppPersistoConfig,
    getComponent,
    deleteComponent,
    saveBackendPlugin,
    getBackendPlugin,
    deleteBackendPlugin,
    deleteApp,
    getAppRepoStatus,
    commitAndPush,
    pullApp,
    listThemesForApp,
    getTheme,
    saveTheme,
    deleteTheme,
    updateAppManifest,
    changeAppTheme
}
