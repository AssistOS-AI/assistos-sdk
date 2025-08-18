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

const saveCode = async function (spaceId, fileName, editorContent) {
    const client = await this.getClient(constants.CODE_MANAGER_PLUGIN, spaceId);
    return await client.saveCode(fileName, editorContent);
}
const saveWebskelComponent = async function (spaceId, fileName, componentData) {
    const client = await this.getClient(constants.CODE_MANAGER_PLUGIN, spaceId);
    return await client.saveWebskelComponent(fileName, componentData);
}
async function getWidget(spaceId, appName, widgetId){
    const client = await this.getClient(constants.CODE_MANAGER_PLUGIN, spaceId);
    return await client.getWidget(appName, widgetId);
}
async function getWidgets(spaceId){
    const client = await this.getClient(constants.CODE_MANAGER_PLUGIN, spaceId);
    return await client.getWidgets();
}
module.exports = {
    getClient,
    getCode,
    saveCode,
    saveWebskelComponent,
    getWidget,
    getWidgets
}
