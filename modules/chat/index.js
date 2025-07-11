const {getAPIClient} = require("../util/utils");
const {CHAT_PLUGIN} = require("../../constants");
const constants = require("../../constants");

async function getClient(pluginName, spaceId) {
    return await getAPIClient(this.__securityContext.userId, pluginName, spaceId, {
        email: this.__securityContext.email
    })
}

async function getChat(spaceId, chatId) {
    const client = await this.getClient(CHAT_PLUGIN, spaceId);
    return await client.getChat(chatId);
}

async function getChats(spaceId) {
    const client = await this.getClient(CHAT_PLUGIN, spaceId);
    return await client.getChats();
}

async function getChatHistory(spaceId, chatId) {
    const client = await this.getClient(CHAT_PLUGIN, spaceId);
    return await client.getChatHistory(chatId);
}

async function getChatContext(spaceId, chatId) {
    const client = await this.getClient(CHAT_PLUGIN, spaceId);
    return await client.getChatContext(chatId);
}

async function createChat(spaceId, name, processId,...args) {
    const client = await this.getClient(CHAT_PLUGIN, spaceId);
    return await client.createChat(name,processId,args);
}

async function deleteChat(spaceId, chatId) {
    const client = await this.getClient(CHAT_PLUGIN, spaceId);
    return await client.deleteChat(chatId);
}

async function resetChatContext(spaceId, chatId) {
    const client = await this.getClient(CHAT_PLUGIN, spaceId);
    return await client.resetChatContext(chatId);
}

async function resetChatMessages(spaceId, chatId) {
    const client = await this.getClient(CHAT_PLUGIN, spaceId);
    return await client.resetChatMessages(chatId);
}

async function addPreferenceToContext(spaceId, chatId, preference) {
    const client = await this.getClient(CHAT_PLUGIN, spaceId);
    return await client.addPreferenceToContext(chatId, preference);
}

async function deletePreferenceFromContext(spaceId, chatId, preference) {
    const client = await this.getClient(CHAT_PLUGIN, spaceId);
    return await client.deletePreferenceFromContext(chatId, preference);
}

async function addMessageToContext(spaceId, chatId, messageId) {
    const client = await this.getClient(CHAT_PLUGIN, spaceId);
    return await client.addMessageToContext(chatId, messageId);
}

async function removeMessageFromContext(spaceId, chatId, messageId) {
    const client = await this.getClient(CHAT_PLUGIN, spaceId);
    return await client.removeMessageFromContext(chatId, messageId);
}

async function updateChatContextItem(spaceId, chatId, contextItemId, contextItem) {
    const client = await this.getClient(CHAT_PLUGIN, spaceId);
    return await client.updateChatContextItem(chatId, contextItemId, contextItem);
}

async function chatInput(spaceId, chatId, agentName, message) {
    const client = await this.getClient(CHAT_PLUGIN, spaceId);
    return await client.chatInput(chatId, agentName, message);
}
function listenForMessages(spaceId, chatId, client) {
    return client.listenForMessages(chatId);
}
async function stopListeningForMessages(spaceId, chatId) {
    const client = await this.getClient(CHAT_PLUGIN, spaceId);
    return client.stopListeningForMessages(chatId);
}

/*Chat scripts*/
async function getChatScripts(spaceId) {
    let client = await this.getClient(constants.CHAT_SCRIPT_PLUGIN, spaceId);
    return await client.getChatScripts();
}
async function getChatScript(spaceId, name) {
    let client = await this.getClient(constants.CHAT_SCRIPT_PLUGIN, spaceId);
    return await client.getChatScript(name);
}
async function createChatScript(spaceId, name, code, description) {
    let client = await this.getClient(constants.CHAT_SCRIPT_PLUGIN, spaceId);
    return await client.createChatScript(name, code, description);
}
async function updateChatScript(spaceId, scriptId, script) {
    let client = await this.getClient(constants.CHAT_SCRIPT_PLUGIN, spaceId);
    await client.updateChatScript(scriptId, script);
    await client.updateChatScriptName(scriptId, script.name);
}
async function deleteChatScript(spaceId, scriptId) {
    let client = await this.getClient(constants.CHAT_SCRIPT_PLUGIN, spaceId);
    return await client.deleteChatScript(scriptId);
}
module.exports = {
    getChat,
    getChats,
    getChatHistory,
    getChatContext,
    createChat,
    deleteChat,
    resetChatContext,
    resetChatMessages,
    addPreferenceToContext,
    deletePreferenceFromContext,
    addMessageToContext,
    removeMessageFromContext,
    updateChatContextItem,
    chatInput,
    listenForMessages,
    getClient,
    stopListeningForMessages,
    getChatScripts,
    getChatScript,
    createChatScript,
    updateChatScript,
    deleteChatScript
};
