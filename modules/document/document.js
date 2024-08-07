const request = require("../util").request;
async function sendRequest(url, method, data) {
    return await request(url, method, this.__securityContext, data);
}
const documentType = "documents";
async function getDocumentsMetadata(spaceId){
    return await this.sendRequest(`/spaces/containerObject/meta/${spaceId}/${documentType}`, "GET");
}
async function getDocument(spaceId, documentId){
    return await this.sendRequest(`/spaces/containerObject/${spaceId}/${documentId}`, "GET");
}
async function addDocument(spaceId, documentData){
    documentData.metadata = ["id", "title"];
    return await this.sendRequest(`/spaces/containerObject/${spaceId}/${documentType}`, "POST", documentData);
}
async function updateDocument(spaceId, documentId, documentData){
    return await this.sendRequest(`/spaces/containerObject/${spaceId}/${documentId}`, "PUT", documentData);
}
async function deleteDocument(spaceId, documentId){
    return await this.sendRequest(`/spaces/containerObject/${spaceId}/${documentId}`, "DELETE");
}
async function getDocumentTitle(spaceId, documentId){
    let objectURI = encodeURIComponent(`${documentId}/title`);
    return await this.sendRequest(`/spaces/embeddedObject/${spaceId}/${objectURI}`, "GET");
}
async function updateDocumentTitle(spaceId, documentId, title) {
    let objectURI = encodeURIComponent(`${documentId}/title`);
    return await this.sendRequest(`/spaces/embeddedObject/${spaceId}/${objectURI}`, "PUT", title);
}
async function updateVideo(spaceId, documentId, videoPath){
    let objectURI = encodeURIComponent(`${documentId}/video`);
    return await this.sendRequest(`/spaces/embeddedObject/${spaceId}/${objectURI}`, "PUT", videoPath);
}
async function getDocumentTopic(spaceId, documentId){
    let objectURI = encodeURIComponent(`${documentId}/topic`);
    return await this.sendRequest(`/spaces/embeddedObject/${spaceId}/${objectURI}`, "GET");
}
async function updateDocumentTopic(spaceId, documentId, topic) {
    let objectURI = encodeURIComponent(`${documentId}/topic`);
    return await this.sendRequest(`/spaces/embeddedObject/${spaceId}/${objectURI}`, "PUT", topic);
}
async function getDocumentAbstract(spaceId, documentId){
    let objectURI = encodeURIComponent(`${documentId}/abstract`);
    return await this.sendRequest(`/spaces/embeddedObject/${spaceId}/${objectURI}`, "GET");
}
async function updateDocumentAbstract(spaceId, documentId, abstract) {
    let objectURI = encodeURIComponent(`${documentId}/abstract`);
    return await this.sendRequest(`/spaces/embeddedObject/${spaceId}/${objectURI}`, "PUT", abstract);
}

async function updateDocumentMainIdeas(spaceId, documentId, mainIdeas){
    //mainIdeas is an array of strings
    let objectURI = encodeURIComponent(`${documentId}/mainIdeas`);
    return await this.sendRequest(`/spaces/embeddedObject/${spaceId}/${objectURI}`, "PUT", mainIdeas);
}

async function updateAlternativeTitles(spaceId, documentId, alternativeTitles){
    //alternativeTitles is an array of strings
    let objectURI = encodeURIComponent(`${documentId}/alternativeTitles`);
    return await this.sendRequest(`/spaces/embeddedObject/${spaceId}/${objectURI}`, "PUT", alternativeTitles);
}
async function updateAlternativeAbstracts(spaceId, documentId, alternativeAbstracts){
    //alternativeAbstracts is an array of strings
    let objectURI = encodeURIComponent(`${documentId}/updateAlternativeAbstracts`);
    return await this.sendRequest(`/spaces/embeddedObject/${spaceId}/${objectURI}`, "PUT", alternativeAbstracts);
}
async function documentToVideo(spaceId, documentId){
    return await this.sendRequest(`/spaces/video/compile/${spaceId}/${documentId}`, "POST", {});
}
module.exports = {
    getDocumentTopic,
    getDocumentTitle,
    getDocumentAbstract,
    getDocumentsMetadata,
    getDocument,
    addDocument,
    updateDocument,
    deleteDocument,
    updateDocumentTitle,
    updateDocumentTopic,
    updateDocumentAbstract,
    updateDocumentMainIdeas,
    updateAlternativeTitles,
    updateAlternativeAbstracts,
    sendRequest,
    documentToVideo,
    updateVideo
};