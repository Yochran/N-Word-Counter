const Discord = require("discord.js");
const bot = new Discord.Client();

const config = require("../config.json");

const { MessageEmbed } = require("discord.js");

module.exports = {
    Execute: function(msg) {
        const commandList = '```yaml\nCommands:\n  Help:\n    Description: Gives a helpful message.\n    Usage: ".help"\n  Counter:\n    Description: Gives someones N-Word count.\n    Usage: ".counter <member>"\n  Reset:\n    Description: Resets a members count.\n    Usage: ".reset <member>"```'

        msg.channel.send(new MessageEmbed()
        .setTitle("**N-Word Counter Help**")
        .setDescription("**Prefix:** `.`\n**Author:** Yochran\n\n" + commandList)
        .setFooter(config.Footer)
        .setColor(config.EmbedColor));
    }
}