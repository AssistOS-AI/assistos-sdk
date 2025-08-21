const {getAPIClient} = require("../util/utils");
const constants = require("../../constants");

async function getClient(spaceId){
    return await getAPIClient(this.__securityContext.userId, constants.WEB_ASSISTANT_PLUGIN, spaceId, {
        email: this.__securityContext.email
    })
}

const getWebAssistant = async function (spaceId) {
    const client = await this.getClient(spaceId);
    return client.getWebAssistant();
};

const getAuth = async function (spaceId){
    const client = await this.getClient(spaceId);
    return client.getAuth();
}

const updateWebAssistant = async function(spaceId, data) {
    const client = await this.getClient(spaceId);
    return client.updateWebAssistant(data);
}

const getThemes = async function (spaceId) {
    const client = await this.getClient(spaceId);
    return client.getThemes();
};

const getTheme = async function (spaceId, themeId) {
    const client = await this.getClient(spaceId);
    return client.getTheme(themeId);
};

const addTheme = async function (spaceId, theme) {
    const client = await this.getClient(spaceId);
    return client.addTheme(theme);
};

const updateTheme = async function (spaceId, themeId, theme) {
    const client = await this.getClient(spaceId);
    return client.updateTheme(themeId, theme);
};

const deleteTheme = async function (spaceId, themeId) {
    const client = await this.getClient(spaceId);
    return client.deleteTheme(themeId);
};


module.exports = {
    getAuth,
    getWebAssistant,
    updateWebAssistant,
    getThemes,
    getTheme,
    addTheme,
    updateTheme,
    deleteTheme,
    getClient,
};
