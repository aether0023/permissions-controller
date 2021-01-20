const { Client } = require("discord.js");
const conf = require("./configurations.json");

module.exports = class AetherClient extends Client {
    constructor(token) {
        super();
        this.token = token;
        this.author = conf.DEFAULTS.AUTHOR;
    };
};