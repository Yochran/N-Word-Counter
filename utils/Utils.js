const Discord = require("discord.js");
const bot = new Discord.Client();

const config = require("../config.json");

const { MessageEmbed } = require("discord.js");
const fs = require("fs");

module.exports = {
    getTime: function() {
        const fullTime = new Date();

        const month = fullTime.getMonth();
        const day = fullTime.getDay();
        const year = fullTime.getFullYear();

        const hour = fullTime.getHours();
        const minute = fullTime.getMinutes();

        const time = `${month}/${day}/${year}, ${hour}:${minute}`

        return time;
    },

    logMessage: function(msg) {
        const log = this.getTime() + " [N-Word Counter]: " + msg;
        console.log(log);

        let toWrite;
        try {
            let current = fs.readFileSync("logs.txt");
            toWrite = current + log + "\n";
            fs.writeFileSync("logs.txt", toWrite, (err) => {
                if (err) {
                    console.log(this.getTime() + " [N-Word Counter]: There was a utility error when writing to a file. (logMessage, Utils.js.)");
                }
            })
        } catch (err) {
            console.log(this.getTime() + " [N-Word Counter]: There was a utility error when reading from a file. (logMessage, Utils.js.)");
            fs.writeFileSync("logs.txt", " ", (err) => {
                if (err) {
                    console.log(this.getTime() + " [N-Word Counter]: There was a utility error when writing to a file. (logMessage, Utils.js.)");
                }
            })
        }
    },

    logError: function(msg) {
        const log = this.getTime() + " [N-Word Counter]: (Error)" + msg;
        console.log(this.getTime() + " [N-Word Counter]:" + "---------- START ERROR: ----------");
        console.log(log);
        console.log(this.getTime() + " [N-Word Counter]:" + "---------- END ERROR: ----------");

        let toWrite;
        try {
            let current = fs.readFileSync("logs.txt");
            toWrite = current + this.getTime() + " [N-Word Counter]:" + "---------- START ERROR: ----------" + log + this.getTime() + " [N-Word Counter]:" + "---------- END ERROR: ----------" + "\n";
            fs.writeFileSync("logs.txt", toWrite, (err) => {
                if (err) {
                    console.log(this.getTime() + " [N-Word Counter]: There was a utility error when writing to a file. (logError, Utils.js.)");
                }
            })
        } catch (err) {
            console.log(this.getTime() + " [N-Word Counter]: There was a utility error when reading from a file. (logError, Utils.js.)");
        }
    }
}