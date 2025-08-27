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

const createChat = async function (spaceId, email, docId, scriptName, args) {
    const client = await this.getClient(CHAT_ROOM_PLUGIN, spaceId);
    return await client.createChat(email, docId, scriptName, args);
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

/*Chat scripts*/
async function getChatScripts(spaceId) {
    let client = await this.getClient(constants.CHAT_SCRIPT_PLUGIN, spaceId);
    return await client.getChatScripts();
}
async function getChatScript(spaceId, name) {
    let client = await this.getClient(constants.CHAT_SCRIPT_PLUGIN, spaceId);
    return await client.getChatScript(name);
}
async function createChatScript(spaceId, name, code, description, widgets, role) {
    let client = await this.getClient(constants.CHAT_SCRIPT_PLUGIN, spaceId);
    return await client.createChatScript(name, code, description, widgets, role);
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
async function getChatScriptNamesByRole(spaceId) {
    let client = await this.getClient(constants.CHAT_SCRIPT_PLUGIN, spaceId);
    return await client.getChatScriptNamesByRole();
}
const getDefaultChatScript = async function (spaceId) {
    const client = await this.getClient(constants.CHAT_SCRIPT_PLUGIN, spaceId);
    return await client.getDefaultChatScript();
}
async function getComponentsForChatRoomInstance(spaceId, chatId){
    let client = await this.getClient(CHAT_ROOM_PLUGIN, spaceId);
    return await client.getComponentsForChatRoomInstance(chatId);
}
async function setChatUIContext(spaceId, chatId, context){
    let client = await this.getClient(CHAT_ROOM_PLUGIN, spaceId);
    return await client.setChatUIContext(chatId, context);
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
    getChatScripts,
    getChatScript,
    createChatScript,
    updateChatScript,
    deleteChatScript,
    getDefaultChatScript,
    getComponentsForChatRoomInstance,
    getChatScriptNamesByRole,
    setChatUIContext
};
