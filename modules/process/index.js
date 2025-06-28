const {getAPIClient} = require("../util/utils");
const constants = require("../../constants");

async function getClient(pluginName, spaceId) {
    return await getAPIClient(this.__securityContext.userId, pluginName, spaceId, {
        email: this.__securityContext.email
    })
}
 async function getProcesses  (spaceId) {
    let client = await this.getClient(constants.PROCESS_PLUGIN, spaceId);
    return await client.getProcesses();
}
async function getProcess(spaceId, processName) {
    let client = await this.getClient(constants.PROCESS_PLUGIN, spaceId);
    const process = await client.getProcess(processName);
    if (!process) {
        throw new Error(`Process ${processName} not found`);
    }
    return process;
}
async function addProcess (spaceId, processObject) {
    let client = await this.getClient(constants.PROCESS_PLUGIN, spaceId);
    return await client.addProcess(processObject);
}
async function updateProcess(spaceId, processId, processObject) {
    let client = await this.getClient(constants.PROCESS_PLUGIN, spaceId);
    return await client.updateProcess(processId, processObject);
}
async function  deleteProcess(spaceId, processId) {
    let client = await this.getClient(constants.PROCESS_PLUGIN, spaceId);
    return await client.deleteProcess(processId);
}

module.exports = {
    getClient,
    getProcesses,
    getProcess,
    addProcess,
    updateProcess,
    deleteProcess
}