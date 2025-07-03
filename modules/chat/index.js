const {getAPIClient} = require("../util/utils");
const {CHAT_PLUGIN} = require("../../constants");

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

async function getChatMessages(spaceId, chatId) {
    const client = await this.getClient(CHAT_PLUGIN, spaceId);
    return await client.getChatMessages(chatId);
}

async function getChatMessage(spaceId, chatId, messageId) {
    const client = await this.getClient(CHAT_PLUGIN, spaceId);
    return await client.getChatMessage(chatId, messageId);
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

async function resetChat(spaceId, chatId) {
    const client = await this.getClient(CHAT_PLUGIN, spaceId);
    return await client.resetChat(chatId);
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

async function sendMessage(spaceId, chatId, userId, message, role) {
    const client = await this.getClient(CHAT_PLUGIN, spaceId);
    return await client.sendMessage(chatId, userId, message, role);
}

async function chatInput(spaceId, chatId, agentName, message) {
    const client = await this.getClient(CHAT_PLUGIN, spaceId);
    return await client.chatInput(chatId, agentName, message);
}
async function waitMessage(spaceId, chatId) {
    const client = await this.getClient(CHAT_PLUGIN, spaceId);
    return await client.waitMessage(chatId);
}
async function sendQueryStreaming(spaceId, chatId, personalityId, userId, prompt) {
    const client = await this.getClient(CHAT_PLUGIN, spaceId);
    return await client.sendQueryStreaming(chatId, personalityId, userId, prompt);
}

module.exports = {
    getChat,
    getChats,
    getChatMessages,
    getChatContext,
    createChat,
    deleteChat,
    resetChat,
    resetChatContext,
    resetChatMessages,
    addPreferenceToContext,
    deletePreferenceFromContext,
    addMessageToContext,
    removeMessageFromContext,
    updateChatContextItem,
    sendMessage,
    getChatMessage,
    chatInput,
    waitMessage,
    sendQueryStreaming,
    getClient
};
