const Discord = require("discord.js");
const bot = new Discord.Client();

const config = require("../config.json");
const stats = require("../stats.json");
const Utils = require("../utils/Utils");

const fs = require("fs");

module.exports = {
    Trigger: function(msg) {
        var members = stats.Members;
        for (var selected in members) {
            if (members.hasOwnProperty(selected)) {
                if (selected === msg.author.id) {
                    const newValue = members[selected] + 1;
                    members[selected] = newValue;
                    fs.writeFile("stats.json", JSON.stringify(stats, null, 2), function writeJSON(err) {
                        if (err) {
                            console.log(this.getTime() + " [N-Word Counter]: There was a utility error when writing to a file. (Trigger, NWordListener.js.)");
                        }
                    });
                }
            }
        }
    }
}