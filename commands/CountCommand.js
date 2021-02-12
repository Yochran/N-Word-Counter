const Discord = require("discord.js");
const bot = new Discord.Client();

const config = require("../config.json");
const stats = require("../stats.json");

const { MessageEmbed } = require("discord.js");
const Utils = require("../utils/Utils");

module.exports = {
    Execute: function(msg, args) {
        if (args.length === 0) {
            let amount;
            var members = stats.Members;
            for (var selected in members) {
                if (members.hasOwnProperty(selected)) {
                    if (selected === msg.author.id) {
                        amount = members[selected];
                    }
                }
            }

            msg.channel.send(new MessageEmbed()
            .setTitle("**" + msg.author.username + "'s N-Word Counter:**")
            .setDescription("**Your N-Word count is:** " + amount)
            .setFooter(config.Footer)
            .setColor(config.EmbedColor));
        } else if (args.length === 1) {
            const member = msg.mentions.members.first();
            if (!member) {
                msg.channel.send(new MessageEmbed()
                .setTitle("**Invalid Member!**")
                .setDescription("**Invalid Member!** (You must ping them!)")
                .setFooter(config.Footer)
                .setColor(config.EmbedColor));
            } else {
                let amount;
                var members = stats.Members;
                for (var selected in members) {
                    if (members.hasOwnProperty(selected)) {
                        if (selected === member.id) {
                            amount = members[selected];
                        }
                    }
                }

                msg.channel.send(new MessageEmbed()
                .setTitle("**" + member.user.username + "'s N-Word Counter:**")
                .setDescription(`**<@${member.id}>'s N-Word count is:** ${amount}`)
                .setFooter(config.Footer)
                .setColor(config.EmbedColor));
            }
        } else {
            msg.channel.send(new MessageEmbed()
                .setTitle("**Incorrect Usage!**")
                .setDescription("**Correct Usage:** `.counter <member>`")
                .setFooter(config.Footer)
                .setColor(config.EmbedColor));
        }
    }
}