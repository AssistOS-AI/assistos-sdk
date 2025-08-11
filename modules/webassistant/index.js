const {getAPIClient} = require("../util/utils");
const constants = require("../../constants");
const PLUGIN = constants.WEB_ASSISTANT_PLUGIN;

async function getClient(spaceId){
    return await getAPIClient(this.__securityContext.userId, PLUGIN, spaceId, {
        email: this.__securityContext.email
    })
}

const getWebAssistant= async function (spaceId) {
    const client = await this.getClient(spaceId);
    return client.getWebAssistant();
};

const getAuth = async function (spaceId){
    const client = await this.getClient(spaceId);
    return client.getAuth();
}
const getSettings = async function(spaceId){
    const client = await this.getClient(spaceId);
    return client.getSettings();
}

const updateSettings = async function(spaceId, settings) {
    const client = await this.getClient(spaceId);
    return client.updateSettings(settings);
}

const getThemes = async function (spaceId) {
    const client = await this.getClient(spaceId);
    return client.getThemes();
};

const getTheme = async function (spaceId, themeId) {
    const client = await this.getClient(spaceId);
    return client.getTheme(themeId);
};

const addTheme = async function (spaceId, theme) {
    const client = await this.getClient(spaceId);
    return client.addTheme(theme);
};

const updateTheme = async function (spaceId, themeId, theme) {
    const client = await this.getClient(spaceId);
    return client.updateTheme(themeId, theme);
};
const deleteTheme = async function (spaceId, themeId) {
    const client = await this.getClient(spaceId);
    return client.deleteTheme(themeId);
};

const addPage = async function (spaceId, page) {
    const client = await this.getClient(spaceId);
    return client.addPage(page);
};
const getUserChats = async function (spaceId,userId) {
    const client = await this.getClient(spaceId);
    return client.getUserChats(userId);
}
const getPages = async function (spaceId) {
    const client = await this.getClient(spaceId);
    return client.getPages();
};
const getPage = async function (spaceId, pageId) {
    const client = await this.getClient(spaceId);
    return client.getPage(pageId);
};
const updatePage = async function (spaceId, pageId, page) {
    const client = await this.getClient(spaceId);
    return client.updatePage(pageId, page);
};
const deletePage = async function (spaceId, pageId) {
    const client = await this.getClient(spaceId);
    return client.deletePage(pageId);
};
const getHomePage = async function (spaceId) {
    const client = await this.getClient(spaceId);
    return client.getHomePage();
};
const getMenuItem = async function (spaceId, menuItemId) {
    const client = await this.getClient(spaceId);
    return client.getMenuItem(menuItemId);
};
const getMenu = async function (spaceId) {
    const client = await this.getClient(spaceId);
    return client.getMenu();
};
const addMenuItem = async function (spaceId, menuItem) {
    const client = await this.getClient(spaceId);
    return client.addMenuItem(menuItem);
};
const updateMenuItem = async function (spaceId, menuItemId, menuItem) {
    const client = await this.getClient(spaceId);
    return client.updateMenuItem(menuItemId, menuItem);
};
const deleteMenuItem = async function (spaceId, menuItemId) {
    const client = await this.getClient(spaceId);
    return client.deleteMenuItem(menuItemId);
};
const createControlRoom = async function (spaceId, userId) {
    const client = await this.getClient(spaceId);
    return client.createControlRoom(userId);
}
const getWidget = async function (spaceId, applicationId, widgetName) {
    const client = await this.getClient(spaceId);
    return client.getWidget(applicationId, widgetName);
};

const getScripts = async function(spaceId){
    const client = await this.getClient(spaceId);
    return await client.getScripts();
}

const getScript = async function (spaceId, scriptId){
    const client = await this.getClient(spaceId);
    return await client.getScript(scriptId);
}
const getChat = async function (spaceId, userId, chatId){
    const client = await this.getClient(spaceId);
    return await client.getChat(userId,chatId);
}
const getControlRoom = async function (spaceId, userId) {
    const client = await this.getClient(spaceId);
    return await client.getControlRoom(userId);
}

const getChats = async function (spaceId, userId) {
    const client = await this.getClient(spaceId);
    return await client.getChats(userId);
}
const getDefaultChatScript = async function (spaceId) {
    const client = await this.getClient(spaceId);
    return await client.getDefaultChatScript();
}

const createChat = async function (spaceId, userId, chatData) {
    const client = await this.getClient(spaceId);
    return await client.createChat(userId,chatData);
}

module.exports = {
    getChat,
    getChats,
    createChat,
    getScripts,
    getScript,
    getAuth,
    getWebAssistant,
    getThemes,
    getSettings,
    updateSettings,
    getTheme,
    addTheme,
    getControlRoom,
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
    getDefaultChatScript,
    deleteMenuItem,
    getWidget,
    createControlRoom,
    getUserChats,
    getClient
};
