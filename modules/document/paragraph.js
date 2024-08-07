async function getParagraph(spaceId, documentId, paragraphId) {
    let objectURI = encodeURIComponent(`${documentId}/${paragraphId}`);
    return await this.sendRequest(`/spaces/embeddedObject/${spaceId}/${objectURI}`, "GET");
}

async function addParagraph(spaceId, documentId, chapterId, paragraphData) {
    let objectURI = encodeURIComponent(`${documentId}/${chapterId}/paragraphs`);
    return await this.sendRequest(`/spaces/embeddedObject/${spaceId}/${objectURI}`, "POST", paragraphData);
}

async function updateParagraph(spaceId, documentId, paragraphId, paragraphData) {
    let objectURI = encodeURIComponent(`${documentId}/${paragraphId}`);
    return await this.sendRequest(`/spaces/embeddedObject/${spaceId}/${objectURI}`, "PUT", paragraphData);
}

async function deleteParagraph(spaceId, documentId, chapterId, paragraphId) {
    let objectURI = encodeURIComponent(`${documentId}/${chapterId}/${paragraphId}`);
    return await this.sendRequest(`/spaces/embeddedObject/${spaceId}/${objectURI}`, "DELETE");
}

async function swapParagraphs(spaceId, documentId, chapterId, paragraphId, paragraphId2) {
    let body = {
        item1: paragraphId,
        item2: paragraphId2
    }
    let objectURI = encodeURIComponent(`${documentId}/${chapterId}/paragraphs`);
    return await this.sendRequest(`/spaces/embeddedObject/swap/${spaceId}/${objectURI}`, "PUT", body);
}

async function updateParagraphText(spaceId, documentId, paragraphId, text) {
    let objectURI = encodeURIComponent(`${documentId}/${paragraphId}/text`);
    return await this.sendRequest(`/spaces/embeddedObject/${spaceId}/${objectURI}`, "PUT", text);
}

async function updateParagraphMainIdea(spaceId, documentId, paragraphId, mainIdea) {
    let objectURI = encodeURIComponent(`${documentId}/${paragraphId}/mainIdea`);
    return await this.sendRequest(`/spaces/embeddedObject/${spaceId}/${objectURI}`, "PUT", mainIdea);
}

async function getAlternativeParagraph(spaceId, documentId, alternativeParagraphId) {
    let objectURI = encodeURIComponent(`${documentId}/${alternativeParagraphId}`);
    return await this.sendRequest(`/spaces/embeddedObject/${spaceId}/${objectURI}`, "GET");
}

async function addAlternativeParagraph(spaceId, documentId, chapterId, paragraphId, alternativeParagraph) {
    let objectURI = encodeURIComponent(`${documentId}/${chapterId}/${paragraphId}/alternativeParagraphs`);
    return await this.sendRequest(`/spaces/embeddedObject/${spaceId}/${objectURI}`, "POST", alternativeParagraph);
}

async function updateAlternativeParagraph(spaceId, documentId, alternativeParagraphId, alternativeParagraph) {
    let objectURI = encodeURIComponent(`${documentId}/${alternativeParagraph.id}`);
    return await this.sendRequest(`/spaces/embeddedObject/${spaceId}/${objectURI}`, "PUT", alternativeParagraph);
}

async function deleteAlternativeParagraph(spaceId, documentId, chapterId, paragraphId, alternativeParagraphId) {
    let objectURI = encodeURIComponent(`${documentId}/${chapterId}/${paragraphId}/${alternativeParagraphId}`);
    return await this.sendRequest(`/spaces/embeddedObject/${spaceId}/${objectURI}`, "DELETE");
}

async function updateParagraphAudioConfigs(spaceId, documentId, paragraphId, audioURL) {
    let objectURI = encodeURIComponent(`${documentId}/${paragraphId}/audioConfig`);
    return await this.sendRequest(`/spaces/embeddedObject/${spaceId}/${objectURI}`, "PUT", audioURL);
}
async function getParagraphAudioConfigs(spaceId, documentId, paragraphId) {
    let objectURI = encodeURIComponent(`${documentId}/${paragraphId}/audioConfig`);
    return await this.sendRequest(`/spaces/embeddedObject/${spaceId}/${objectURI}`, "GET");
}
async function updateParagraphAudio(spaceId, documentId, paragraphId, audioURL) {
    let objectURI = encodeURIComponent(`${documentId}/${paragraphId}/audio`);
    return await this.sendRequest(`/spaces/embeddedObject/${spaceId}/${objectURI}`, "PUT", audioURL);
}

async function generateParagraphAudio(spaceId, documentId, paragraphId) {
    return await this.sendRequest(`/spaces/audio/${spaceId}/${documentId}/${paragraphId}`, "POST", {});
}

async function getParagraphAudio(spaceId, documentId, paragraphId) {
    let objectURI = encodeURIComponent(`${documentId}/${paragraphId}/audio`);
    return await this.sendRequest(`/spaces/embeddedObject/${spaceId}/${objectURI}`, "GET");
}

async function updateImageParagraphDimensions(spaceId, documentId, paragraphId, dimensions) {
    let objectURI = encodeURIComponent(`${documentId}/${paragraphId}/dimensions`);
    return await this.sendRequest(`/spaces/embeddedObject/${spaceId}/${objectURI}`, "PUT", dimensions);
}

module.exports = {
    getParagraph,
    addParagraph,
    updateParagraph,
    deleteParagraph,
    swapParagraphs,
    updateParagraphText,
    updateParagraphMainIdea,
    addAlternativeParagraph,
    updateAlternativeParagraph,
    deleteAlternativeParagraph,
    updateParagraphAudio,
    updateImageParagraphDimensions,
    getParagraphAudio,
    generateParagraphAudio,
    updateParagraphAudioConfigs,
    getParagraphAudioConfigs
}