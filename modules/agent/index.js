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

async function addAgent(spaceId, agentData){
    let client = await this.getClient(constants.AGENT_PLUGIN, spaceId);
    let agent = await client.createAgent(agentData.name, agentData.description, "", agentData.imageId);
    let chatClient = await this.getClient(constants.CHAT_ROOM_PLUGIN, spaceId);
    //use default chatScript
    //let chatId = await chatClient.createChat(agent.id);
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

async function exportAgent(spaceId, agentId){
    let client = await this.getClient(constants.AGENT_PLUGIN, spaceId);
    return await client.exportAgent(agentId);
}
async function getAgentNames(spaceId){
    let client = await this.getClient(constants.AGENT_PLUGIN, spaceId);
    return await client.getAgentNames();
}
module.exports = {
    exportAgent,
    addAgent,
    updateAgent,
    deleteAgent,
    getAgent,
    getAgents,
    getDefaultAgent,
    getClient,
    getAgentNames
}
