const Discord = require("discord.js");
const bot = new Discord.Client();

const config = require("../config.json");
const stats = require("../stats.json");
const Utils = require("../utils/Utils");

const fs = require("fs");

module.exports = {
    Trigger: function(msg, server, hardR) {
        const members = stats.Members;
        const selected = msg.author.id;

        try {
            if (!members[selected]) {
                if (hardR) {
                    members.NewMember = {
                        NewServer : [
                            1,
                            1
                        ]
                    };
                } else {
                    members.NewMember = {
                        NewServer : [
                            1,
                            0
                        ]
                    };
                }
    
                members[selected] = members["NewMember"];
                members[selected][server] = members[selected]["NewServer"];
                delete members["NewMember"];
                delete members[selected]["NewServer"];
            } else {
                if (!members[selected][server]) {
                    console.log("debug");
                    if (hardR) {
                        members[selected].NewServer = [
                            1,
                            1
                        ]
                    } else {
                        members[selected].NewServer = [
                            1,
                            0
                        ]
                    }
                }
    
                members[selected][server] = members[selected]["NewServer"];
                delete members[selected]["NewServer"];
            }
    
            fs.writeFile("stats.json", JSON.stringify(stats, null, 2), function writeJSON(err) {
                if (err) {
                    console.log(this.getTime() + " [N-Word Counter]: There was a utility error when writing to a file. (Trigger, NWordListener.js.)");
                }
            });
        } catch (err) {
            Utils.logError("Error while writing to stats file. (AddMemberListener, Trigger).");
        }
    }
}