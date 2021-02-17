const Discord = require("discord.js");
const bot = new Discord.Client();

const config = require("../config.json");
const stats = require("../stats.json");

const { MessageEmbed } = require("discord.js");

const fs = require("fs");
const Utils = require("../utils/Utils");

module.exports = {
    Execute: function(msg, args) {
        const server = msg.guild.name;
        if (!msg.member.hasPermission("MANAGE_MESSAGES")) return;
        if (args.length !== 1) {
            msg.channel.send(new MessageEmbed()
                .setTitle("**Incorrect Usage!**")
                .setDescription("**Correct Usage:** `.reset <member>`")
                .setFooter(config.Footer)
                .setColor(config.EmbedColor));
        } else {
            const member = msg.mentions.members.first();
            if (!member) {
                msg.channel.send(new MessageEmbed()
                .setTitle("**Invalid Member!**")
                .setDescription("**Invalid Member!** (You must ping them!)")
                .setFooter(config.Footer)
                .setColor(config.EmbedColor)); 
            } else {
                try {
                    stats.Members[member.id][server][0] = 0;
                    stats.Members[member.id][server][1] = 0;
                    fs.writeFile("stats.json", JSON.stringify(stats, null, 2), (err) => {
                        if (err) {
                            Utils.logError("Error while writing to stats file. (ResetCommand, Execute).");
                        }
                    });
                    msg.channel.send(new MessageEmbed()
                    .setTitle("**Success!**")
                    .setDescription(`(:white_check_mark:) You have reset <@${member.id}>'s count.`)
                    .setFooter(config.Footer)
                    .setColor(config.EmbedColor)); 
                } catch (err) {
                    Utils.logError("Error while writing to stats file. (ResetCommand, Execute).");
                }
            } 
        }
    }
}