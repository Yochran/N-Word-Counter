const Discord = require("discord.js");

const config = require("../config.json");
const stats = require("../stats.json");

const { MessageEmbed } = require("discord.js");

module.exports = {
    Execute: function(msg, args) {
        const members = stats.Members;
        const server = msg.guild.name;
        const selected = msg.author.id;
        if (args.length === 0) {
            var totalAmount = 0;
            var hardRAmount = 0;

            if (members[selected][server] && members[selected]) {
                totalAmount = members[selected][server][0];
                hardRAmount = members[selected][server][1];
            }

            msg.channel.send(new MessageEmbed()
            .setTitle("**" + msg.author.username + "'s N-Word Counter:**")
            .setDescription(`**Your N-Word count is:** ${totalAmount}.\n**Your** **__Hard-R__** **count is:** ${hardRAmount}.`)
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
                let totalAmount = 0;
                let hardRAmount = 0;

                if (members[member.id] && members[member.id][server]) {
                    totalAmount = members[member.id][server][0];
                    hardRAmount = members[member.id][server][1];
                }

                msg.channel.send(new MessageEmbed()
                .setTitle("**" + member.user.username + "'s N-Word Counter:**")
                .setDescription(`**<@${member.id}>'s N-Word count is:** ${totalAmount}.\n**<@${member.id}>'s** **__Hard-R__** **count is:** ${hardRAmount}.`)
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