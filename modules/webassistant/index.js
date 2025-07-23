const {getAPIClient} = require("../util/utils");
const constants = require("../../constants");
const PLUGIN = constants.WEB_ASSISTANT_PLUGIN;

async function getClient(spaceId){
    return await getAPIClient(this.__securityContext.userId, PLUGIN, spaceId, {
        email: this.__securityContext.email
    })
}

const getWebAssistant= async function (spaceId,assistantId) {
    const client = await this.getClient(spaceId);
    return client.getWebAssistant(assistantId);
};

const getAuth = async function (spaceId,assistantId){
    const client = await this.getClient(spaceId);
    return client.getAuth(assistantId);
}
const getSettings = async function(spaceId,assistantId){
    const client = await this.getClient(spaceId);
    return client.getSettings(assistantId);
}

const updateSettings = async function(spaceId, assistantId,settings) {
    const client = await this.getClient(spaceId);
    return client.updateSettings(assistantId,settings);
}

const getThemes = async function (spaceId,assistantId) {
    const client = await this.getClient(spaceId);
    return client.getThemes(assistantId);
};

const getTheme = async function (spaceId,assistantId, themeId) {
    const client = await this.getClient(spaceId);
    return client.getTheme(assistantId,themeId);
};

const addTheme = async function (spaceId,assistantId, theme) {
    const client = await this.getClient(spaceId);
    return client.addTheme(assistantId,theme);
};

const updateTheme = async function (spaceId,assistantId, themeId, theme) {
    const client = await this.getClient(spaceId);
    return client.updateTheme(assistantId,themeId, theme);
};
const deleteTheme = async function (spaceId,assistantId, themeId) {
    const client = await this.getClient(spaceId);
    return client.deleteTheme(assistantId,themeId);
};

const addPage = async function (spaceId,assistantId, page) {
    const client = await this.getClient(spaceId);
    return client.addPage(assistantId,page);
};

const getPages = async function (spaceId,assistantId) {
    const client = await this.getClient(spaceId);
    return client.getPages(assistantId);
};
const getPage = async function (spaceId,assistantId, pageId) {
    const client = await this.getClient(spaceId);
    return client.getPage(assistantId,pageId);
};
const updatePage = async function (spaceId,assistantId, pageId, page) {
    const client = await this.getClient(spaceId);
    return client.updatePage(assistantId,pageId, page);
};
const deletePage = async function (spaceId,assistantId, pageId) {
    const client = await this.getClient(spaceId);
    return client.deletePage(assistantId,pageId);
};
const getHomePage = async function (spaceId,assistantId) {
    const client = await this.getClient(spaceId);
    return client.getHomePage(assistantId);
};
const getMenuItem = async function (spaceId,assistantId, menuItemId) {
    const client = await this.getClient(spaceId);
    return client.getMenuItem(assistantId,menuItemId);
};
const getMenu = async function (spaceId,assistantId) {
    const client = await this.getClient(spaceId);
    return client.getMenu(assistantId);
};
const addMenuItem = async function (spaceId,assistantId, menuItem) {
    const client = await this.getClient(spaceId);
    return client.addMenuItem(assistantId,menuItem);
};
const updateMenuItem = async function (spaceId,assistantId,menuItemId, menuItem) {
    const client = await this.getClient(spaceId);
    return client.updateMenuItem(assistantId,menuItemId, menuItem);
};
const deleteMenuItem = async function (spaceId,assistantId, menuItemId) {
    const client = await this.getClient(spaceId);
    return client.deleteMenuItem(assistantId,menuItemId);
};

const getWidget = async function (spaceId,assistantId, applicationId, widgetName) {
    const client = await this.getClient(spaceId);
    return client.getWidget(assistantId,applicationId, widgetName);
};

const getScripts = async function(spaceId,assistantId){
    const client = await this.getClient(spaceId);
    return await client.getScripts(assistantId);
}

const getScript = async function (spaceId,assistantId,scriptId){
    const client = await this.getClient(spaceId);
    return await client.getScript(assistantId,scriptId);

}

const addScript = async function(spaceId,assistantId,scriptData){
    const client = await this.getClient(spaceId);
    return await client.addScript(assistantId,scriptData);

}
const updateScript = async function(spaceId,assistantId,scriptId,scriptData){
    const client = await this.getClient(spaceId);
    return await client.updateScript(assistantId,scriptId,scriptData);

}
const deleteScript = async function(spaceId,assistantId,scriptId){
    const client = await this.getClient(spaceId);
    return await client.deleteScript(assistantId,scriptId);

}
module.exports = {
    getScripts,
    getScript,
    addScript,
    updateScript,
    deleteScript,
    getAuth,
    getWebAssistant,
    getThemes,
    getSettings,
    updateSettings,
    getTheme,
    addTheme,
    updateTheme,
    deleteTheme,
    addPage,
    getPages,
    getPage,
    updatePage,
    deletePage,
    getHomePage,
    getMenuItem,
    getMenu,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    getWidget,
    getClient
};
