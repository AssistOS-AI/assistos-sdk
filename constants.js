module.exports = {
    DEFAULT_ID_LENGTH: 16,
    DEFAULT_PERSONALITY_NAME: "Assistant",
    ENV_TYPE: {
        NODE: "node",
        BROWSER: "browser",
        UNKNOWN: "unknown"
    },
    ENVIRONMENT_MODE: "DEVELOPMENT_BASE_URL",
    PRODUCTION_BASE_URL: "http://demo.assistos.net:8080",
    DEVELOPMENT_BASE_URL: "http://localhost:8080",
    COMMANDS_CONFIG: {
        ORDER: [
            "soundEffect",
            "audio",
            "image",
            "video",
            "speech",
            "silence",
            "lipsync"
        ],
        EMOTIONS: {
            'female_happy': 'Female Happy',
            'female_sad': 'Female Sad',
            'female_angry': 'Female Angry',
            'female_fearful': 'Female Fearful',
            'female_disgust': 'Female Disgust',
            'female_surprised': 'Female Surprised',
            'male_happy': 'Male Happy',
            'male_sad': 'Male Sad',
            'male_angry': 'Male Angry',
            'male_fearful': 'Male Fearful',
            'male_disgust': 'Male Disgust',
            'male_surprised': 'Male Surprised'
        },
        COMMANDS: [
            {
                NAME: "speech",
                ALLOWED_ALONG: ["lipsync", "videoScreenshot"],
                VALIDATE: async (spaceId, paragraph, securityContext) => {
                    const personalityModule = require('assistos').loadModule('personality', securityContext);
                    if (!paragraph) {
                        throw ("Paragraph not found");
                    }
                    if (paragraph.text.trim() === "") {
                        throw ("Paragraph text is empty");
                    }
                    if (!paragraph.commands["speech"]) {
                        throw ("Paragraph Must have a speech command");
                    }
                    const speechPersonality = paragraph.commands["speech"].personality;
                    const personalityData = await personalityModule.getPersonalityByName(spaceId, speechPersonality);
                    if (!personalityData) {
                        throw `Personality ${speechPersonality} not found`;
                    }
                    if (!personalityData.voiceId) {
                        throw `Personality ${speechPersonality} has no voice configured`;
                    }

                },
                EXECUTE: async (spaceId, documentId, paragraphId, securityContext) => {
                    const documentModule = require('assistos').loadModule('document', securityContext);
                    return await documentModule.generateParagraphAudio(spaceId, documentId, paragraphId);
                },
                PARAMETERS: [
                    {
                        REQUIRED: true,
                        NAME: "personality",
                        SHORTHAND: "p",
                        TYPE: "string",
                    },
                    {
                        REQUIRED: true,
                        NAME: "emotion",
                        SHORTHAND: "e",
                        TYPE: "string",
                        VALUES: ['female_happy',
                            'female_sad',
                            'female_angry',
                            'female_fearful',
                            'female_disgust',
                            'female_surprised',
                            'male_happy',
                            'male_sad',
                            'male_angry',
                            'male_fearful',
                            'male_disgust',
                            'male_surprised']
                    }, {
                        NAME: "styleGuidance",
                        SHORTHAND: "sg",
                        TYPE: "number",
                        MIN_VALUE: 0,
                        MAX_VALUE: 100
                    },
                    {
                        NAME: "taskId",
                        SHORTHAND: "t",
                        TYPE: "string"
                    }
                ]
            },
            {
                NAME: "silence",
                ALLOWED_ALONG: ["videoScreenshot"],
                PARAMETERS:
                    [{
                        NAME: "duration",
                        SHORTHAND: "d",
                        TYPE: "number",
                        MIN_VALUE: 1,
                        MAX_VALUE: 3600,
                    }],
                VALIDATE: async function () {
                    return true;
                }
            },
            {
                NAME: "lipsync",
                ALLOWED_ALONG: ["speech", "videoScreenshot"],
                REQUIRED: [],
                VALIDATE: async (spaceId, paragraph, securityContext) => {
                    if (!paragraph.commands.audio && !paragraph.commands.speech) {
                        throw ("Paragraph Must have an attached audio or a speech command before adding lip sync");
                    }
                    if (!paragraph.commands.image && !paragraph.commands.video) {
                        throw ("Paragraph Must have an image or a video before adding lip sync");
                    }
                },
                EXECUTE: async (spaceId, documentId, paragraphId, securityContext) => {
                    const documentModule = require('assistos').loadModule('document', securityContext);
                    return await documentModule.generateParagraphLipSync(spaceId, documentId, paragraphId);
                },
                PARAMETERS: [{
                    NAME: "taskId",
                    SHORTHAND: "t",
                    TYPE: "string"
                }]
            },
            {
                NAME: "audio",
                PARAMETERS: [
                    {
                        REQUIRED:true,
                        NAME: "id",
                        TYPE: "string",
                    },
                    {
                        REQUIRED:true,
                        NAME: "duration",
                        TYPE: "number",
                        MIN_VALUE: 0,
                        MAX_VALUE: 3600
                    }
                ],
                VALIDATE: async (spaceId, resourceId, securityContext) => {
                    /*  const spaceModule = require('assistos').loadModule('space', securityContext);
                      const audio = await spaceModule.getAudioHead(spaceId, resourceId);
                      if (!audio) {
                          throw ("Invalid audio Id");
                      }*/
                }
            },
            {
                NAME:"soundEffect",
                PARAMETERS: [
                    {
                        REQUIRED:true,
                        NAME: "id",
                        TYPE: "string"
                    },
                    {
                        REQUIRED:true,
                        NAME: "duration",
                        TYPE: "number",
                        MIN_VALUE: 0,
                        MAX_VALUE: 3600
                    },
                    {
                        DEFAULT:false,
                        NAME: "loop",
                        TYPE: "boolean"
                    },
                    {
                        NAME: "volume",
                        TYPE: "number",
                        DEFAULT: 1.0,
                        MIN_VALUE: 0.0,
                        MAX_VALUE: 1.0,
                        DESCRIPTION: "Controls the audio volume (range 0.0 to 1.0)."
                    },
                    {
                        NAME: "currentTime",
                        TYPE: "number",
                        DEFAULT: 0.0,
                        MIN_VALUE: 0.0,
                        DESCRIPTION: "Gets or sets the current playback time in seconds."
                    },
                    {
                        NAME: "playbackRate",
                        TYPE: "number",
                        DEFAULT: 1.0,
                        MIN_VALUE: 0.5,
                        MAX_VALUE: 4.0,
                        DESCRIPTION: "Controls the speed at which the audio is played (1.0 is normal speed)."
                    },
                    {
                        NAME: "muted",
                        DEFAULT: false,
                        TYPE: "boolean",
                        DESCRIPTION: "Mutes or unmutes the audio."
                    },
                    {
                        NAME: "start",
                        TYPE: "number",
                        DESCRIPTION: "The time in seconds where the audio should start playing."
                    }
                ],
                VALIDATE: async (spaceId, paragraph) => {
                    let startTime = paragraph.commands.soundEffect.start;
                    let audioDuration = paragraph.commands.audio ? paragraph.commands.audio.duration : 0;
                    let videoDuration = paragraph.commands.video ? paragraph.commands.video.duration : 0;
                    let maxDuration = Math.max(audioDuration, videoDuration);
                    if(startTime > maxDuration){
                        throw ("Sound effect start time cannot be greater than audio or video duration");
                    }
                }
            },
            {
                NAME: "video",
                PARAMETERS: [
                    {
                        NAME: "id",
                        TYPE: "string",
                    },
                    {
                        NAME: "thumbnailId",
                        TYPE: "string"
                    },
                    {
                        NAME: "width",
                        TYPE: "number",
                        MIN_VALUE: 1,
                        MAX_VALUE: 10920
                    }, {
                        NAME: "height",
                        TYPE: "number",
                        MIN_VALUE: 1,
                        MAX_VALUE: 10080
                    },
                    {
                        NAME: "duration",
                        TYPE: "number",
                        MIN_VALUE: 0,
                        MAX_VALUE: 3600
                    }
                ],
                VALIDATE: async (spaceId, resourceId, securityContext) => {
                    /*       const spaceModule = require('assistos').loadModule('space', securityContext);
                           const video = await spaceModule.getVideoHead(spaceId, resourceId);
                           if (!video) {
                               throw ("Invalid video Id");
                           }*/
                }
            },
            {
                NAME: "image",
                PARAMETERS: [
                    {
                        NAME: "id",
                        TYPE: "string",
                    },
                    {
                        NAME: "width",
                        TYPE: "number",
                        MIN_VALUE: 20,
                        MAX_VALUE: 8000
                    }, {
                        NAME: "height",
                        TYPE: "number",
                        MIN_VALUE: 20,
                        MAX_VALUE: 8000
                    }
                ],
                VALIDATE: async (spaceId, resourceId, securityContext) => {
                    /*     const spaceModule = require('assistos').loadModule('space', securityContext);
                         const image = await spaceModule.getImageHead(spaceId, resourceId);
                         if (!image) {
                             throw ("Invalid image Id");
                         }*/
                }
            }
        ]
    },
    getImageSrc: (spaceId, imageId) => {
        return `spaces/images/${spaceId}/${imageId}`;
    },
    getAudioSrc: (spaceId, audioId) => {
        return `spaces/audios/${spaceId}/${audioId}`;
    },
    getVideoSrc: (spaceId, videoId) => {
        return `spaces/videos/${spaceId}/${videoId}`;
    }
}

