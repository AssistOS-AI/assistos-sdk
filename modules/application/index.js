const request = require("../util").request;
let {getAPIClient} = require("../util/utils");
const {addSecret} = require("../space");

const constants = require("../../constants");

async function sendRequest(url, method, data) {
    return await request(url, method, data, this.__securityContext);
}
async function getWidgets(spaceId) {
    let client = await this.getClient(constants.APPLICATION_PLUGIN, spaceId);
    return await client.getWidgets();
}
 async function getClient(pluginName, serverlessId){
     return await getAPIClient(this.__securityContext.userId, pluginName, serverlessId, {
         email: this.__securityContext.email,
         authToken: this.__securityContext.authToken,
         sessionId: this.__securityContext.sessionId
     })
}
async function installSystemApp(appName){
    let client = await this.getClient(constants.ASSISTOS_ADMIN_PLUGIN);
    return await client.installSystemApp(appName);
}
async function updateSystemApp(appName) {
    let client = await this.getClient(constants.ASSISTOS_ADMIN_PLUGIN);
    return await client.updateApplication(appName);
}
async function requiresUpdateSystemApp(appName) {
    let client = await this.getClient(constants.ASSISTOS_ADMIN_PLUGIN);
    return await client.requiresUpdate(appName);
}

async function installApplication(spaceId, applicationId) {
    let client = await this.getClient(constants.APPLICATION_PLUGIN, spaceId);
    const appInstallationStatus = await client.installApplication(applicationId);
    const applicationManifest = await client.getApplicationManifest(applicationId);
    const promises = [];
    if (applicationManifest?.secrets && Array.isArray(applicationManifest.secrets)) {
        for (let i = 0; i < applicationManifest.secrets.length; i++) {
            const secret = applicationManifest.secrets[i];
            promises.push(addSecret.call(this,spaceId,secret.provider, secret.keyName, ""));
        }
    }
    return await Promise.all(promises);
}

async function uninstallApplication(spaceId, applicationId) {
    let client = await this.getClient(constants.APPLICATION_PLUGIN, spaceId);
    return await client.uninstallApplication(applicationId);
}

async function getApplicationConfig(spaceId, applicationId) {
    //TODO: tons of requests when loading plugins in document page
    let client = await this.getClient(constants.APPLICATION_PLUGIN, spaceId);
    return await client.loadApplicationConfig(applicationId);
}

async function getAvailableApps(spaceId) {
    let client = await this.getClient(constants.APPLICATION_PLUGIN, spaceId);
    return await client.getAvailableApps();
}

async function getApplications(spaceId) {
    let client = await this.getClient(constants.APPLICATION_PLUGIN, spaceId);
    return await client.getApplications();
}

async function updateApplication(spaceId, applicationId) {
    let client = await this.getClient(constants.APPLICATION_PLUGIN, spaceId);
    return await client.updateApplication(applicationId);
}

async function requiresUpdate(spaceId, applicationId) {
    let client = await this.getClient(constants.APPLICATION_PLUGIN, spaceId);
    return await client.requiresUpdate(spaceId, applicationId);
}

async function getApplicationFile(spaceId, applicationId, relativeAppFilePath) {
    const pathSegments = relativeAppFilePath.split('/').map(segment => encodeURIComponent(segment));
    const encodedPath = pathSegments.join('/');
    const pathParts = relativeAppFilePath.split(".");
    const type = pathParts[pathParts.length - 1].toLowerCase(); // Normalize file extension
    if (type !== "js") {
        let response = await fetch(`/applications/files/${spaceId}/${applicationId}/${encodedPath}`, {
            method: "GET",
            credentials: 'include'
        });
        return await response.text();
    } else {
        return await import(`/applications/files/${spaceId}/${applicationId}/${encodedPath}`);
    }
}

async function getApplicationTasks(spaceId, applicationId) {
    let client = await this.getClient(constants.APPLICATION_PLUGIN, spaceId);
    return await client.getApplicationTasks(applicationId);
}

async function getApplicationsPlugins(spaceId) {
    let client = await this.getClient(constants.APPLICATION_PLUGIN, spaceId);
    return await client.getApplicationsPlugins();
}

/*
async function storeAppObject(appName, objectType, objectId, stringData) {
    return await this.sendRequest(`/app/${assistOS.space.id}/applications/${appName}/${objectType}/${objectId}`, "PUT", stringData);
}
async function loadAppObjects(appName, objectType) {
    return await this.sendRequest(`/app/${assistOS.space.id}/applications/${appName}/${objectType}`, "GET");
}
*/


module.exports = {
    getClient,
    installApplication,
    getWidgets,
    uninstallApplication,
    getAvailableApps,
    getApplicationConfig,
    getApplicationFile,
    sendRequest,
    updateApplication,
    requiresUpdate,
    getApplicationTasks,
    getApplicationsPlugins,
    getApplications,
    installSystemApp,
    updateSystemApp,
    requiresUpdateSystemApp
};
