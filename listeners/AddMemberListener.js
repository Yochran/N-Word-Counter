const Discord = require("discord.js");
const bot = new Discord.Client();

const config = require("../config.json");
const stats = require("../stats.json");
const Utils = require("../utils/Utils");

const fs = require("fs");

module.exports = {
    Trigger: function(msg, hardR) {
        const members = stats.Members;

        try {
            if (hardR) {
                members.NewMember = [
                    1,
                    1
                ];
            } else {
                members.NewMember = [
                    1,
                    0
                ];
            }
            const newKey = msg.author.id;
            members[newKey] = members["NewMember"];
            delete members["NewMember"];
            fs.writeFile("stats.json", JSON.stringify(stats, null, 2), function writeJSON(err) {
                if (err) {
                    console.log(this.getTime() + " [N-Word Counter]: There was a utility error when writing to a file. (Trigger, NWordListener.js.)");
                }
            });
        } catch (err) {
            Utils.logError("Error when reading/writing to stats.json. Check file's existence.");
        }
    }
}