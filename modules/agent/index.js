const {getAPIClient} = require("../util/utils");
const constants = require("../../constants");
async function getClient(pluginName, spaceId) {
    return await getAPIClient(this.__securityContext.userId, pluginName, spaceId, {
        email: this.__securityContext.email
    })
}
async function getAgents(spaceId){
    let client = await this.getClient(constants.AGENT_PLUGIN, spaceId);
    return await client.getAllAgentObjects();
}

async function getAgent(spaceId, agentId){
    let client = await this.getClient(constants.AGENT_PLUGIN, spaceId);
    return await client.getAgent(agentId);
}

async function getDefaultAgent(spaceId){
    return await this.getAgent(spaceId, constants.DEFAULT_AGENT);
}

async function addChat(spaceId, chatId, agentId) {
    let client = await this.getClient(constants.AGENT_PLUGIN, spaceId);
    return await client.addChat(chatId, agentId);
}

async function removeChatFromAgent(spaceId, chatId, agentId) {
    let client = await this.getClient(constants.AGENT_PLUGIN, spaceId);
    return await client.removeChatFromAgent(chatId, agentId);
}

async function getPersonalitiesConversations(spaceId,personalityId){
    return await this.sendRequest(`/personalities/chats/${spaceId}/${personalityId}`,"GET")
}
async function getAgentsConversations(spaceId,agentId){
    let client = await this.getClient(constants.AGENT_PLUGIN, spaceId);
    return await client.getConversationIds(agentId);
}
async function addAgent(spaceId, agentData){
    let client = await this.getClient(constants.AGENT_PLUGIN, spaceId);
    let chatClient = await this.getClient(constants.CHAT_PLUGIN, spaceId);
    let agent = await client.createAgent(agentData.name, agentData.description, "", agentData.imageId);
    let chatId = await chatClient.createChat(agent.id);
    //await chatClient.addChatToAgent(agent.id, chatId);
    return agent;
}

async function updateAgent(spaceId, agentId, agentData){
    let client = await this.getClient(constants.AGENT_PLUGIN, spaceId);
    return await client.updateAgent(agentId, agentData);
}
async function deleteAgent(spaceId, agentId){
    let client = await this.getClient(constants.AGENT_PLUGIN, spaceId);
    return await client.deleteAgent(agentId);
}

async function exportPersonality(spaceId, personalityId){
    return await this.sendRequest(`/spaces/${spaceId}/export/personalities/${personalityId}`, "GET");
}

async function sendQuery(spaceId, personalityId, chatId, prompt){
    return await this.sendRequest(`/chats/send/${spaceId}/${personalityId}/${chatId}`, "POST", prompt);
}

async function sendChatQuery(spaceId, chatId, agentId,userId,prompt){
    let client = await this.getClient(constants.AGENT_PLUGIN, spaceId);
    return await client.sendChatQuery(chatId, agentId, userId, prompt);
}


module.exports = {
    addAgent,
    updateAgent,
    deleteAgent,
    getAgent,
    getAgents,
    getPersonalitiesConversations,
    exportPersonality,
    sendQuery,
    sendChatQuery,
    addChat,
    removeChatFromAgent,
    getDefaultAgent,
    getAgentsConversations,
    getClient
}
