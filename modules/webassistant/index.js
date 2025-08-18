const {getAPIClient} = require("../util/utils");
const constants = require("../../constants");

async function getClient(spaceId){
    return await getAPIClient(this.__securityContext.userId, constants.WEB_ASSISTANT_PLUGIN, spaceId, {
        email: this.__securityContext.email
    })
}

const getWebAssistant = async function (spaceId) {
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

const getUserChats = async function (spaceId,userId) {
    const client = await this.getClient(spaceId);
    return client.getUserChats(userId);
}

const getScripts = async function(spaceId){
    const client = await this.getClient(spaceId);
    return await client.getScripts();
}

const getScript = async function (spaceId, scriptId){
    const client = await this.getClient(spaceId);
    return await client.getScript(scriptId);
}

const getDefaultChatScript = async function (spaceId) {
    const client = await this.getClient(spaceId);
    return await client.getDefaultChatScript();
}

const createChat = async function (spaceId, userId, docId, scriptName, args) {
    const client = await this.getClient(spaceId);
    return await client.createChat(userId, docId, scriptName, args);
}
const createDefaultChat = async function (spaceId, userId, docId, scriptName, args) {
    const client = await this.getClient(spaceId);
    return await client.createDefaultChat(userId, docId, scriptName, args);
}

module.exports = {
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
    updateTheme,
    deleteTheme,
    getDefaultChatScript,
    getUserChats,
    getClient,
    createDefaultChat
};
