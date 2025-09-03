const {getAPIClient} = require("../util/utils");
const {CHAT_ROOM_PLUGIN} = require("../../constants");
const constants = require("../../constants");

async function getClient(pluginName, spaceId) {
    return await getAPIClient(this.__securityContext.userId, pluginName, spaceId, {
        email: this.__securityContext.email
    })
}

async function getChat(spaceId, chatId) {
    const client = await this.getClient(CHAT_ROOM_PLUGIN, spaceId);
    return await client.getChat(chatId);
}

async function getChats(spaceId) {
    const client = await this.getClient(CHAT_ROOM_PLUGIN, spaceId);
    return await client.getChats();
}

async function getChatHistory(spaceId, chatId) {
    const client = await this.getClient(CHAT_ROOM_PLUGIN, spaceId);
    return await client.getChatHistory(chatId);
}

async function getChatContext(spaceId, chatId) {
    const client = await this.getClient(CHAT_ROOM_PLUGIN, spaceId);
    return await client.getChatContext(chatId);
}


const getUserChats = async function (spaceId, email) {
    const client = await this.getClient(CHAT_ROOM_PLUGIN, spaceId);
    return client.getUserChats(email);
}

const createChat = async function (spaceId, email, docId, appName, scriptName, args) {
    const client = await this.getClient(CHAT_ROOM_PLUGIN, spaceId);
    return await client.createChat(email, docId, appName, scriptName, args);
}
const createDefaultChat = async function (spaceId, email, docId, scriptName, args) {
    const client = await this.getClient(CHAT_ROOM_PLUGIN, spaceId);
    return await client.createDefaultChat(email, docId, scriptName, args);
}

async function deleteChat(spaceId, chatId) {
    const client = await this.getClient(CHAT_ROOM_PLUGIN, spaceId);
    return await client.deleteChat(chatId);
}

async function chatInput(spaceId, chatId, agentName, message, role) {
    const client = await this.getClient(CHAT_ROOM_PLUGIN, spaceId);
    return await client.chatInput(chatId, agentName, message, role);
}
function listenForMessages(spaceId, chatId, client) {
    return client.listenForMessages(chatId);
}
async function stopListeningForMessages(spaceId, chatId) {
    const client = await this.getClient(CHAT_ROOM_PLUGIN, spaceId);
    return client.stopListeningForMessages(chatId);
}

async function getComponentsForChatRoomInstance(spaceId, chatId){
    let client = await this.getClient(CHAT_ROOM_PLUGIN, spaceId);
    return await client.getComponentsForChatRoomInstance(chatId);
}
async function setChatUIContext(spaceId, chatId, context){
    let client = await this.getClient(CHAT_ROOM_PLUGIN, spaceId);
    return await client.setChatUIContext(chatId, context);
}
async function resetChatRoom(spaceId, chatId){
    let client = await this.getClient(CHAT_ROOM_PLUGIN, spaceId);
    return await client.resetChatRoom(chatId);
}
module.exports = {
    getChat,
    getChats,
    getChatHistory,
    getChatContext,
    getUserChats,
    createDefaultChat,
    createChat,
    deleteChat,
    chatInput,
    listenForMessages,
    getClient,
    stopListeningForMessages,
    getComponentsForChatRoomInstance,
    setChatUIContext,
    resetChatRoom
};
