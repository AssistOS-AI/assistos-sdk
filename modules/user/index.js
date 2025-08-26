const { request } = require("../util");
const { getAPIClient } = require("../util/utils");
const constants = require("../../constants");

async function sendRequest(url, method, data, headers) {
    return await request(url, method, data, this.__securityContext, headers);
}
async function getClient(pluginName, spaceId) {
    return await getAPIClient(this.__securityContext.userId, pluginName, spaceId, {
        email: this.__securityContext.email
    })
}
async function loadUser(email) {
    let url = "/auth/getInfo"
    if (email) {
        url += `?email=${encodeURIComponent(email)}`;
    }
    let userInfo = await this.sendRequest(url, "GET");
    let client = await this.getClient(constants.ADMIN_PLUGIN);
    let role = await client.getUserRole(userInfo.email);
    return {
        email: userInfo.email,
        currentSpaceId: userInfo.currentSpaceId,
        spaces: userInfo.spaces,
        imageId: userInfo.imageId,
        role: role,
        id: userInfo.globalUserId,
    }
}
async function getGlobalRoles() {
    let client = await this.getClient(constants.ADMIN_PLUGIN);
    return await client.getRoles();
}

async function listUserSpaces(email) {
    let url = "/spaces/listSpaces"
    if (email) {
        url += `?email=${encodeURIComponent(email)}`;
    }
    return await this.sendRequest(url, "GET");
}

async function getUserProfileImage(email) {
    email = encodeURIComponent(email);
    let userInfo = await this.sendRequest(`/auth/getInfo?email=${email}`, "GET");
    let spaceModule = AssistOS.loadModule("space", this.__securityContext);
    return await spaceModule.getImage(userInfo.imageId);
}

async function updateUserImage(email, imageId) {
    email = encodeURIComponent(email);
    let userInfo = await this.sendRequest(`/auth/getInfo?email=${email}`, "GET");
    userInfo.imageId = imageId;
    return await this.sendRequest(`/auth/setInfo?email=${email}`, "PUT", userInfo);
}

async function getCurrentSpaceId(email) {
    email = encodeURIComponent(email);
    let userInfo = await this.sendRequest(`/auth/getInfo?email=${email}`, "GET");
    return userInfo.currentSpaceId;
}

async function logoutUser() {
    return await this.sendRequest(`/auth/logout`, "POST");
}

async function createGuestUser() {
    let client = await this.getClient(constants.ADMIN_PLUGIN);
    return await client.createGuestUser();
}

async function emailLogin(email, code) {
    return await this.sendRequest(`/auth/loginWithEmailCode`, 'POST', { email, code });
}

async function passkeyLogin(email, assertion, challengeKey) {
    return await this.sendRequest(`/auth/loginWithPasskey`, 'POST', { email, assertion, challengeKey });
}

async function totpLogin(email, code) {
    return await this.sendRequest(`/auth/loginWithTotp`, 'POST', { email, token: code });
}

async function generateAuthCode(email, name, refererId) {
    return await this.sendRequest(`/auth/sendCodeByEmail`, "POST", { email, name, refererId });
}

async function setupTotp() {
    return await this.sendRequest(`/auth/setupTotp`, 'POST');
}

async function enableTotp(token, email) {
    return await this.sendRequest(`/auth/enableTotp`, 'POST', {
        token,
        email
    });
}

async function getPublicAuthInfo(email) {
    email = encodeURIComponent(email)
    return await this.sendRequest(`/auth/getPublicAuthInfo/${email}`, "GET")
}

async function generatePasskeyLoginOptions(email) {
    email = encodeURIComponent(email)
    return await this.sendRequest(`/auth/generatePasskeyLoginOptions/${email}`, "GET")
}

async function generatePasskeySetupOptions() {
    return await this.sendRequest(`/auth/generatePasskeySetupOptions`, 'POST');
}

async function addPasskey(registrationData, challengeKey) {
    return await this.sendRequest(`/auth/addPasskey`, 'POST', {
        registrationData,
        challengeKey
    });
}

async function deletePasskey(email, credentialId) {
    return await this.sendRequest(`/auth/deletePasskey/${encodeURIComponent(email)}/${encodeURIComponent(credentialId)}`, 'DELETE');
}

async function deleteTotp(email) {
    return await this.sendRequest(`/auth/deleteTotp/${encodeURIComponent(email)}`, 'DELETE');
}
async function getUserLogs(email) {
    let client = await this.getClient(constants.USER_LOGGER_PLUGIN);
    return await client.getUserLogs(email);
}
async function getUsers(offset, limit) {
    let client = await this.getClient(constants.ADMIN_PLUGIN);
    return await client.getUsers(offset, limit);
}
async function getUsersCount() {
    let client = await this.getClient(constants.ADMIN_PLUGIN);
    return await client.getUsersCount();
}
async function setUserRole(email, role) {
    let client = await this.getClient(constants.ADMIN_PLUGIN);
    return await client.setUserRole(email, role);
}
async function blockUser(email) {
    let client = await this.getClient(constants.ADMIN_PLUGIN);
    return await client.blockUser(email);
}
async function unblockUser(email) {
    let client = await this.getClient(constants.ADMIN_PLUGIN);
    return await client.unblockUser(email);
}
async function deleteUser(email) {
    let client = await this.getClient(constants.ADMIN_PLUGIN);
    return await client.deleteUser(email);
}
async function getMatchingUsers(input) {
    let client = await this.getClient(constants.ADMIN_PLUGIN);
    return await client.getMatchingUsers(input);
}
async function createTicket(email, subject, message) {
    let client = await this.getClient(constants.TICKETS_PLUGIN);
    return await client.createTicket(email, subject, message);
}
async function resolveTicket(ticketId, resolutionMessage) {
    let client = await this.getClient(constants.TICKETS_PLUGIN);
    return await client.resolveTicket(ticketId, resolutionMessage);
}
async function getTicketsCount() {
    let client = await this.getClient(constants.TICKETS_PLUGIN);
    return await client.getTicketsCount();
}
async function getTickets(offset, limit) {
    let client = await this.getClient(constants.TICKETS_PLUGIN);
    return await client.getTickets(offset, limit);
}
async function getUnresolvedTicketsCount() {
    let client = await this.getClient(constants.TICKETS_PLUGIN);
    return await client.getUnresolvedTicketsCount();
}
async function getUserTickets(email) {
    let client = await this.getClient(constants.TICKETS_PLUGIN);
    return await client.getUserTickets(email);
}
async function getOwnTickets(email) {
    let client = await this.getClient(constants.TICKETS_PLUGIN);
    return await client.getOwnTickets(email);
}

module.exports = {
    loadUser,
    sendRequest,
    getUserProfileImage,
    updateUserImage,
    logoutUser,
    emailLogin,
    passkeyLogin,
    totpLogin,
    generateAuthCode,
    getCurrentSpaceId,
    listUserSpaces,
    setupTotp,
    createGuestUser,
    enableTotp,
    generatePasskeySetupOptions,
    getPublicAuthInfo,
    generatePasskeyLoginOptions,
    addPasskey,
    deletePasskey,
    deleteTotp,
    getClient,
    getUserLogs,
    getUsers,
    getUsersCount,
    setUserRole,
    blockUser,
    unblockUser,
    deleteUser,
    getGlobalRoles,
    getMatchingUsers,
    createTicket,
    resolveTicket,
    getTicketsCount,
    getTickets,
    getOwnTickets,
    getUnresolvedTicketsCount,
    getUserTickets
}