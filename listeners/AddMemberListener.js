const Discord = require("discord.js");
const bot = new Discord.Client();

const config = require("../config.json");
const stats = require("../stats.json");
const Utils = require("../utils/Utils");

const fs = require("fs");

module.exports = {
    Trigger: function(msg, server, totalAmount, hardRAmount) {
        const members = stats.Members;
        const selected = msg.author.id;

        try {
            if (!members[selected]) {
                members.NewMember = {
                    NewServer : [
                        0,
                        0
                    ]
                }
    
                members[selected] = members["NewMember"];
                members[selected][server] = members[selected]["NewServer"];
                delete members["NewMember"];
                delete members[selected]["NewServer"];
            } else {
                if (!members[selected][server]) {
                    members[selected]["NewServer"] = [
                        0,
                        0
                    ]
                }
    
                members[selected][server] = members[selected]["NewServer"];
                delete members[selected]["NewServer"];
            }
    
            members[selected][server][0] = totalAmount;
            members[selected][server][1] = hardRAmount;

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