const LLM = require("./models/LLM.js");
const {request} = require("../util");
async function sendRequest(url, method, data) {
    return await request(url, method, this.__securityContext, data);
}
async function sendLLMRequest(data){
    return await this.sendRequest(`/llms/generate`, "PUT", data)
}
async function generateImage(spaceId, modelConfigs){
    return await this.sendRequest(`/apis/v1/spaces/${spaceId}/llms/image/generate`, "POST", modelConfigs);
}
async function textToSpeech(spaceId, modelConfigs){
    let response =  await fetch(`/apis/v1/spaces/${spaceId}/llms/audio/generate`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(modelConfigs)
    });
    let audio = await response.blob();
    return audio;
}
async function listVoicesAndEmotions(spaceId){
    return await this.sendRequest(`/apis/v1/spaces/${spaceId}/llms/audio/listVoicesAndEmotions`, "GET");
}
module.exports = {
    sendLLMRequest,
    LLM,
    sendRequest,
    generateImage,
    textToSpeech,
    listVoicesAndEmotions
}