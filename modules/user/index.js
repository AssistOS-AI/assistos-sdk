const crypto = require('opendsu').loadAPI('crypto');
const {request} = require("../util");
async function sendRequest(url, method, data) {
    return await request(url, method, this.__securityContext, data);
}
const prepareSecret = (secret) => {
    return Array.from(crypto.sha256JOSE(secret))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
}

async function registerUser(email, password, imageId, inviteToken) {
    return await this.sendRequest(`/users`, "POST",{
        email: email,
        password: prepareSecret(password),
        inviteToken: inviteToken,
        imageId: imageId
    });
}
async function generateVerificationCode(email,password){
    const headers = {
        "Content-Type": "application/json; charset=UTF-8",
    };
    const options = {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
            email: email,
            password: prepareSecret(password)
        })
    };
    const response = await fetch(`/users/password-reset/request`, options);
    if (!response.ok) {
        const error = new Error(`HTTP error! status: ${response.status}, message: ${response.message}`);
        error.statusCode = response.status;
        throw error;
    }

    return await response.json();
}
async function resetPassword(email, password, code) {
    const headers = {
        "Content-Type": "application/json; charset=UTF-8",
    };
    const options = {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
            email: email,
            password: prepareSecret(password),
            code: code
        })
    };
    const response = await fetch(`/users/password-reset/verify`, options);
    if (!response.ok) {
        const error = new Error(`HTTP error! status: ${response.status}, message: ${response.message}`);
        error.statusCode = response.status;
        throw error;
    }
    return await response.json();
}
async function activateUser(activationToken) {
    const headers = {
        "Content-Type": "application/json; charset=UTF-8",
    };
    const options = {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
            activationToken: activationToken
        })
    };
    const response = await fetch(`/users/verify`, options);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}, message: ${response.message}`);
    }

    return await response.json();
}

async function loginUser(email, password) {
    const headers = {
        "Content-Type": "application/json; charset=UTF-8",
    };
    const options = {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
            email: email,
            password: prepareSecret(password)
        })
    };
    const response = await fetch(`/users/login`, options);
    if (!response.ok) {
        const error = new Error(`HTTP error! status: ${response.status}, message: ${response.message}`);
        error.statusCode = response.status;
        throw error;
    }

    return await response.json();
}

async function loadUser() {
    return await this.sendRequest(`/users`, "GET");
}

async function logoutUser() {
    return await this.sendRequest(`/users/logout`, "GET");
}

async function addGITCredentials(spaceId, username, token) {
    let body = {
        secretName: "gitCredentials",
        secret: {
            username: username,
            token: token
        }
    }
    return await this.sendRequest(`/users/secrets/${spaceId}`, "POST", body);
}
async function deleteGITCredentials(spaceId) {
    let body = {
        secretName: "gitCredentials"
    }
    return await this.sendRequest(`/users/secrets/${spaceId}`, "PUT", body);
}
async function userGITCredentialsExist(spaceId) {
    let body = {
        secretName: "gitCredentials"
    }
    return await this.sendRequest(`/users/secrets/exists/${spaceId}`, "POST", body);
}

async function deleteAPIKey(spaceId, type) {
    return await this.sendRequest(`/spaces/${spaceId}/secrets/keys/${type}`, "DELETE",);
}

async function editAPIKey(apiKeyObj) {
    return await this.sendRequest(`/spaces/secrets/keys`, "POST", apiKeyObj);
}
async function getUserProfileImage(userId) {
    return await this.sendRequest(`/users/profileImage/${userId}`, "GET");
}
async function updateUserImage(userId, imageId) {
    return await this.sendRequest(`/users/profileImage/${userId}`, "POST", {imageId});
}
module.exports = {
    registerUser,
    activateUser,
    loginUser,
    loadUser,
    logoutUser,
    userGITCredentialsExist,
    addGITCredentials,
    deleteGITCredentials,
    editAPIKey,
    deleteAPIKey,
    sendRequest,
    generateVerificationCode,
    resetPassword,
    getUserProfileImage,
    updateUserImage
}
