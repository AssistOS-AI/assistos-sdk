const {request, notificationService} = require("../util");
const Space = require('./models/Space.js');
const Announcement = require('./models/Announcement.js');
const constants = require("../../constants");

async function sendRequest(url, method, data) {
    return await request(url, method, this.__securityContext, data);
}

async function addSpaceAnnouncement(spaceId, announcementData) {
    return await this.sendRequest(`/spaces/${spaceId}/announcements`, "POST", announcementData)
}

async function getSpaceAnnouncement(spaceId, announcementId) {
    return await this.sendRequest(`/spaces/${spaceId}/announcements/${announcementId}`, "GET")
}

async function getSpaceChat(spaceId) {
    return await this.sendRequest(`/spaces/${spaceId}/chat`, "GET")
}

async function getSpaceAnnouncements(spaceId) {
    return await this.sendRequest(`/spaces/${spaceId}/announcements`, "GET")
}

async function deleteSpaceAnnouncement(spaceId, announcementId) {
    return await this.sendRequest(`/spaces/${spaceId}/announcements/${announcementId}`, "DELETE")
}

async function updateSpaceAnnouncement(spaceId, announcementId, announcementData) {
    return await this.sendRequest(`/spaces/${spaceId}/announcements/${announcementId}`, "PUT", announcementData)
}

async function addSpaceChatMessage(spaceId, messageData) {
    return await this.sendRequest(`/spaces/${spaceId}/chat`, "POST", messageData)
}

async function createSpace(spaceName) {
    const bodyObject = {
        spaceName: spaceName
    }
    return await this.sendRequest(`/spaces`, "POST", bodyObject);
}

async function loadSpace(spaceId) {
    let requestURL = spaceId ? `/spaces/${spaceId}` : `/spaces`;
    return await this.sendRequest(requestURL, "GET");
}

async function storeSpace(spaceId, jsonData = null, apiKey = null, userId = null) {
    let headers = {
        "Content-type": "application/json; charset=UTF-8",
        Cookie: this.__securityContext.cookies
    };
    if (apiKey) {
        headers["apikey"] = `${apiKey}`;
        headers["initiatorid"] = `${userId}`;
    }

    let options = {
        method: "PUT",
        headers: headers,
        body: jsonData
    };
    let response = await fetch(`/spaces/${spaceId}`, options);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}, message: ${response.message}`);
    }

    return await response.text();
}

async function deleteSpace(spaceId) {
    return await this.sendRequest(`/spaces/${spaceId}`, "DELETE");
}

async function addKeyToSpace(spaceId, userId, keyType, apiKey) {
    let result;
    let headers = {
        "Content-type": "application/json; charset=UTF-8",
        Cookie: this.__securityContext.cookies
    };
    if (apiKey) {
        headers["apikey"] = `${apiKey}`;
        headers["initiatorid"] = `${userId}`;
    }
    try {
        result = await fetch(`/spaces/${spaceId}/secrets`,
            {
                method: "POST",
                headers: headers
            });
    } catch (err) {
        console.error(err);
    }
    return await result.text();
}

async function getAPIKeysMetadata(spaceId) {
    return await this.sendRequest(`/spaces/${spaceId}/secrets/keys`, "GET");
}

async function inviteSpaceCollaborators(spaceId, collaboratorEmails) {
    return await this.sendRequest(`/spaces/${spaceId}/collaborators`, "POST", {emails: collaboratorEmails});
}


async function deleteImage(spaceId, imageId) {
    return await this.sendRequest(`/spaces/image/${spaceId}/${imageId}`, "DELETE");
}

async function sendGeneralRequest(url, method, data = null, headers = {}) {
    let response;
    try {
        response = await fetch(url, {
            method: method,
            headers: headers,
            ...data ? {body: data} : {}
        });
    } catch (err) {
        console.error(err);
    }
    if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
    }
    switch (response.headers.get("Content-Type")) {
        case "application/json":
            return (await response.json()).data;
        case "application/octet-stream":
        case "audio/mp3":
        case "video/mp4":
        case "image/png":
            return await response.arrayBuffer();
        case "text/plain":
        default :
            return await response.text();
    }
}

async function addAudio(spaceId, audio) {
    const {uploadURL, fileId} = await this.sendRequest(`/spaces/uploads/${spaceId}/audios`, "GET");
    await sendGeneralRequest(uploadURL, "PUT", audio, {"Content-Type": "audio/mpeg"});
    return fileId;
}

async function addImage(spaceId, image) {
    const {uploadURL, fileId} = await this.sendRequest(`/spaces/uploads/${spaceId}/images`, "GET");
    await sendGeneralRequest(uploadURL, "PUT", image, {"Content-Type": "image/png"});
    return fileId;
}

async function addVideo(spaceId, video) {
    const {uploadURL, fileId} = await this.sendRequest(`/spaces/uploads/${spaceId}/videos`, "GET");
    await sendGeneralRequest(uploadURL, "PUT", video, {"Content-Type": "video/mp4"});
    return fileId;
}

async function getAudio(spaceId, audioId) {
    const {downloadURL} = await this.sendRequest(`/spaces/downloads/${spaceId}/audios/${audioId}`, "GET");
    return await sendGeneralRequest(downloadURL, "GET", null, {"Content-Type": "audio/mp3"});
}

async function getImage(spaceId, imageId) {
    const {downloadURL} = await this.sendRequest(`/spaces/downloads/${spaceId}/images/${imageId}`, "GET");
    return await sendGeneralRequest(downloadURL, "GET", null, {"Content-Type": "image/png"});
}

async function getVideo(spaceId, videoId, range) {
    const {downloadURL} = await this.sendRequest(`/spaces/downloads/${spaceId}/videos/${videoId}`, "GET");
    return await sendGeneralRequest(downloadURL, "GET", null, {"Content-Type": "video/mp4", ...range ? {"Range": range} : {}});
}

async function deleteAudio(spaceId, audioId) {
    return await this.sendRequest(`/spaces/audio/${spaceId}/${audioId}`, "DELETE");
}

async function importPersonality(spaceId, personalityFormData) {
    return await this.sendRequest(`/spaces/${spaceId}/import/personalities`, "POST", personalityFormData);
}

async function deleteVideo(spaceId, videoId) {
    return await this.sendRequest(`/spaces/video/${spaceId}/${videoId}`, "DELETE");
}

async function getAudioHead(spaceId, audioId) {
    return await this.sendRequest(`/spaces/audio/${spaceId}/${audioId}`, "HEAD");
}

async function getImageHead(spaceId, imageId) {
    return await this.sendRequest(`/spaces/image/${spaceId}/${imageId}`, "HEAD");
}

async function getVideoHead(spaceId, videoId) {
    return await this.sendRequest(`/spaces/video/${spaceId}/${videoId}`, "HEAD");
}

module.exports = {
    createSpace,
    loadSpace,
    deleteSpace,
    storeSpace,
    addKeyToSpace,
    addSpaceChatMessage,
    addSpaceAnnouncement,
    getSpaceAnnouncement,
    getSpaceAnnouncements,
    updateSpaceAnnouncement,
    deleteSpaceAnnouncement,
    inviteSpaceCollaborators,
    sendRequest,
    getAPIKeysMetadata,
    addImage,
    deleteImage,
    Space,
    Announcement,
    addAudio,
    getAudio,
    deleteAudio,
    importPersonality,
    deleteVideo,
    addVideo,
    getVideo,
    getSpaceChat,
    getAudioHead,
    getImageHead,
    getImage,
    getVideoHead
}



