const Discord = require("discord.js");
const bot = new Discord.Client();

const config = require("./config.json");
const Utils = require("./utils/Utils");
const stats = require("./stats.json");

const { MessageEmbed } = require("discord.js");
const HelpCommand = require("./commands/HelpCommand");
const NWordListener = require("./listeners/NWordListener");
const CountCommand = require("./commands/CountCommand");
const AddMemberListener = require("./listeners/AddMemberListener");

var commands = [];
var immune = [];

bot.once("ready", () => {
    Utils.logMessage("N-Word Counter v2.0 by Yochran is loading...");
    bot.guilds.cache.forEach((guild) => {
        Utils.logMessage("Enabled into guild: " + guild.name + ".");
    });

    bot.user.setActivity("Watching them racists...");
    Utils.logMessage("Loading commands...");

    try {
        registerCommands();
        Utils.logMessage("Commands loaded successfully.");
    } catch (err) {
        Utils.logError("Error while registering commands. (" + err + ").");
    }

    Utils.logMessage("Setting up immune members...");

    try {
        setupImmuneMembers();
        Utils.logMessage("Immune members set up successfully.");
    } catch (err) {
        Utils.logError("Error while setting up immune members. (" + err + ").");
    }

    Utils.logMessage("Bot has finished loading.");
})

function registerCommands() {
    for (var i = 0; i < config.Commands.length; i++) {
        commands.push(config.Commands[i].toLowerCase());
    }
}

function setupImmuneMembers() {
    for (var i = 0; i < config.Immune.length; i++) {
        immune.push(config.Immune[i].toLowerCase());
    }
}

bot.on("message", (msg) => {
    if (msg.content.startsWith(config.Prefix)) {
        if (msg.author.bot) return;

        const args = msg.content.slice(1).trim().split(" ");
        const command = args.shift().toLowerCase();
    
        if (!commands.includes(command)) {
            Utils.logMessage(msg.author.username + " tried to run a command that doesnt exist. (" + command + ").");
            msg.channel.send(new MessageEmbed()
            .setTitle("**Invalid Command**")
            .setDescription("That command does not exist. `.help` for a list of commands.")
            .setFooter(config.Footer)
            .setColor(config.EmbedColor));
        } else {
            switch (command) {
                case "help":
                    HelpCommand.Execute(msg);
                    break;
                case "counter":
                case "count":
                    CountCommand.Execute(msg, args);
                    break;
            }
            Utils.logMessage(msg.author.username + " ran a command. (" + command + ").");
        }
    } else {
        if (msg.author.bot) return;

        if (msg.content.toLowerCase().includes("nigger") || msg.content.toLowerCase().includes("nigga")) {
            if (!immune.includes(msg.author.id)) {
                if (!stats.Members.hasOwnProperty(msg.author.id)) {
                    AddMemberListener.Trigger(msg);
                } else {
                    NWordListener.Trigger(msg);
                }
            }
        }
    }
})

bot.login(config.Token);