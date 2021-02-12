const Discord = require("discord.js");
const bot = new Discord.Client();

const config = require("../config.json");
const stats = require("../stats.json");
const Utils = require("../utils/Utils");

const fs = require("fs");

module.exports = {
    Trigger: function(msg, hardR) {
        var members = stats.Members;
        for (var selected in members) {
            if (members.hasOwnProperty(selected)) {
                if (selected === msg.author.id) {
                    var hardRValue = members[selected][1];
                    if (!hardRValue) {
                        hardRValue = 0;
                    }
                    const totalValue = members[selected][0];
                    if (hardR) {
                        hardRValue = members[selected][1] + 1;
                    }
                    members[selected][1] = hardRValue;
                    members[selected][0] = totalValue + 1;
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